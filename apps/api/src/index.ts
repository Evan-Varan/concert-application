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

app.get('/events', async (request) => {
    const query = request.query as { city?: string };
    const apiKey = process.env.TICKETMASTER_API_KEY

    if(!apiKey){
      return{
        events: [],
        error: 'TICKETMASTER_API_KEY is not set'
      };
    }

    const ticketmasterUrl = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
     ticketmasterUrl.searchParams.set('apikey', apiKey);
    ticketmasterUrl.searchParams.set('classificationName', 'music');
    ticketmasterUrl.searchParams.set('city', 'Austin');
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

    const events = ticketmasterEvents.map((event: any) => {
      const venue = event._embedded?.venues?.[0];

      return {
        id: event.id,
        artist: event.name,
        venue: venue?.name ?? 'Unknown venue',
        city: venue?.city?.name ?? 'Unknown city',
        date: event.dates?.start?.dateTime ?? event.dates?.start?.localDate ?? '',
        imageUrl: event.images?.[0]?.url ?? '',
      };
    });

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