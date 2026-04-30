import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Client } from 'pg'
import 'dotenv/config'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: true
})

const databaseUrl = process.env.DATABASE_URL
const port = Number(process.env.PORT ?? 4000)
const stubHubClientId = process.env.STUBHUB_CLIENT_ID
const stubHubClientSecret = process.env.STUBHUB_CLIENT_SECRET

let stubHubAccessToken: string | null = null
let stubHubAccessTokenExpiresAt = 0

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

app.get('/health', async () => {
  return { ok: true }
})

app.get('/health/db', async () => {
  const client = new Client({ connectionString: databaseUrl })

  try {
    await client.connect()
    const result = await client.query('SELECT NOW() AS now')
    return {
      ok: true,
      db: 'connected',
      now: result.rows[0]?.now ?? null
    }
  } catch (error) {
    app.log.error(error)
    return {
      ok: false,
      db: 'disconnected'
    }
  } finally {
    await client.end().catch(() => {})
  }
})

const getStubHubAccessToken = async () => {
  if (!stubHubClientId || !stubHubClientSecret) {
    return null
  }

  if (stubHubAccessToken && Date.now() < stubHubAccessTokenExpiresAt) {
    return stubHubAccessToken
  }

  const credentials = Buffer.from(`${stubHubClientId}:${stubHubClientSecret}`).toString('base64')
  const response = await fetch('https://account.stubhub.com/oauth2/token', {
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'read:events',
    }),
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  if (!response.ok) {
    app.log.warn({ status: response.status }, 'StubHub token request failed')
    return null
  }

  const tokenResponse = await response.json() as {
    access_token?: string
    expires_in?: number
  }

  if (!tokenResponse.access_token) {
    return null
  }

  stubHubAccessToken = tokenResponse.access_token
  stubHubAccessTokenExpiresAt = Date.now() + ((tokenResponse.expires_in ?? 3600) - 60) * 1000

  return stubHubAccessToken
}

const normalizeForMatch = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const getStubHubEventUrl = async (event: any) => {
  const token = await getStubHubAccessToken()

  if (!token) {
    return null
  }

  const venue = event._embedded?.venues?.[0]
  const localDate = event.dates?.start?.localDate
  const latitude = venue?.location?.latitude
  const longitude = venue?.location?.longitude
  const searchUrl = new URL('https://api.stubhub.net/catalog/events/search')

  searchUrl.searchParams.set('q', event.name)
  searchUrl.searchParams.set('page_size', '5')
  searchUrl.searchParams.set('exclude_parking_passes', 'true')

  if (localDate) {
    searchUrl.searchParams.set('dateLocal', localDate)
  }

  if (latitude && longitude) {
    searchUrl.searchParams.set('latitude', latitude)
    searchUrl.searchParams.set('longitude', longitude)
    searchUrl.searchParams.set('max_distance_in_meters', '25000')
  }

  const response = await fetch(searchUrl, {
    headers: {
      Accept: 'application/hal+json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    app.log.warn({ status: response.status, ticketmasterEventId: event.id }, 'StubHub event search failed')
    return null
  }

  const searchResults = await response.json() as {
    _embedded?: {
      items?: any[]
    }
  }
  const items = searchResults._embedded?.items ?? []
  const normalizedTicketmasterName = normalizeForMatch(event.name)
  const normalizedVenueName = normalizeForMatch(venue?.name ?? '')
  const matchingEvent =
    items.find((stubHubEvent) => {
      const normalizedStubHubName = normalizeForMatch(stubHubEvent.name ?? '')
      const normalizedStubHubVenue = normalizeForMatch(stubHubEvent._embedded?.venue?.name ?? '')
      const stubHubDate = typeof stubHubEvent.start_date === 'string' ? stubHubEvent.start_date.slice(0, 10) : null
      const nameMatches =
        normalizedStubHubName.includes(normalizedTicketmasterName) ||
        normalizedTicketmasterName.includes(normalizedStubHubName)
      const venueMatches =
        !normalizedVenueName ||
        normalizedStubHubVenue.includes(normalizedVenueName) ||
        normalizedVenueName.includes(normalizedStubHubVenue)
      const dateMatches = !localDate || !stubHubDate || stubHubDate === localDate

      return nameMatches && venueMatches && dateMatches
    }) ?? items[0]

  return matchingEvent?._links?.['event:webpage']?.href ?? null
}

app.get('/events', async (request) => {
    const query = request.query as { city?: string };
    const apiKey = process.env.TICKETMASTER_API_KEY
    const city = query.city ?? 'Austin'

    if(!apiKey){
      return{
        events: [],
        error: 'TICKETMASTER_API_KEY is not set'
      };
    }

    const ticketmasterUrl = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
     ticketmasterUrl.searchParams.set('apikey', apiKey);
    ticketmasterUrl.searchParams.set('classificationName', 'music');
    ticketmasterUrl.searchParams.set('city', city);
    ticketmasterUrl.searchParams.set('latlong', '30.2672,-97.7431');
    ticketmasterUrl.searchParams.set('radius', '50');
    ticketmasterUrl.searchParams.set('unit', 'miles');
    // ticketmasterUrl.searchParams.set('countryCode', 'US');
    // ticketmasterUrl.searchParams.set('size', '10');

    const response = await fetch(ticketmasterUrl);

    if(!response.ok){
      return{
        events:[],
        error:`Ticketmaster request failed with ${response.status}`,
      };
    }
    
     const data = await response.json();

    const ticketmasterEvents = data._embedded?.events ?? [];

    const getBestPriceRange = (event: any) => {
      const priceRanges = Array.isArray(event.priceRanges) ? event.priceRanges : [];
      const validRanges = priceRanges.filter(
        (priceRange: any) =>
          typeof priceRange?.min === 'number' || typeof priceRange?.max === 'number',
      );

      if (validRanges.length === 0) {
        return {
          currency: 'USD',
          max: null,
          min: null,
        };
      }

      return {
        currency: validRanges.find((priceRange: any) => priceRange.currency)?.currency ?? 'USD',
        max: Math.max(
          ...validRanges.map((priceRange: any) =>
            typeof priceRange.max === 'number' ? priceRange.max : priceRange.min,
          ),
        ),
        min: Math.min(
          ...validRanges.map((priceRange: any) =>
            typeof priceRange.min === 'number' ? priceRange.min : priceRange.max,
          ),
        ),
      };
    };

    const eventDetails = await Promise.all(
      ticketmasterEvents.map(async (event: any) => {
        const detailUrl = new URL(`https://app.ticketmaster.com/discovery/v2/events/${event.id}.json`);
        detailUrl.searchParams.set('apikey', apiKey);

        const detailResponse = await fetch(detailUrl);

        if (!detailResponse.ok) {
          return event;
        }

        const detail = await detailResponse.json();

        return {
          ...event,
          ...detail,
          distance: detail.distance ?? event.distance,
        };
      }),
    );

    const events = await Promise.all(eventDetails.map(async (event: any) => {
      const venue = event._embedded?.venues?.[0];
      const classification = event.classifications?.[0];
      const priceRange = getBestPriceRange(event);
      const distance = Number(event.distance ?? venue?.distance);
      const ticketStatus = event.dates?.status?.code ?? 'unknown';
      const venueLatitude = Number(venue?.location?.latitude);
      const venueLongitude = Number(venue?.location?.longitude);
      const stubHubUrl = await getStubHubEventUrl(event).catch((error) => {
        app.log.warn({ error, ticketmasterEventId: event.id }, 'StubHub event URL resolution failed')
        return null
      });

      return {
        id: event.id,
        artist: event.name,
        venue: venue?.name ?? 'Unknown venue',
        city: venue?.city?.name ?? 'Unknown city',
        date: event.dates?.start?.dateTime ?? event.dates?.start?.localDate ?? '',
        genre: classification?.genre?.name ?? classification?.subGenre?.name ?? 'Other',
        minTicketPrice: priceRange.min,
        maxTicketPrice: priceRange.max,
        ticketCurrency: priceRange.currency,
        ticketStatus,
        soldOut: ticketStatus === 'soldout',
        distanceMiles: Number.isFinite(distance) ? distance : null,
        venueLatitude: Number.isFinite(venueLatitude) ? venueLatitude : null,
        venueLongitude: Number.isFinite(venueLongitude) ? venueLongitude : null,
        ticketUrl: event.url ?? null,
        stubHubUrl,
        imageUrl: event.images?.[0]?.url ?? '',
      };
    }));

    return {
      events,
    };
  });


const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
