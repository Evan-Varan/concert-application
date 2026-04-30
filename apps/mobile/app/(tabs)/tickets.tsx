import { ActivityIndicator, Alert, Pressable, ScrollView, TextInput, View } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import ConcertSectionHeader from '@/app/components/concert-section-header';
import AppScreen from '@/app/components/ui/app-screen';
import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';
import ConcertCardTicketsPage from '../components/concert-card-tickets-page';

// const socialEvents = [
//   {
//     artist: 'Japanese Breakfast',
//     date: 'Thu, Apr 10',
//     venue: 'Empire Control Room',
//     friendsInterested: ['AM', 'SK', 'JL', 'RP'],
//     imageUrl:
//       'https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwYmFuZCUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzc1NjYzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
//   },
//   {
//     artist: 'Khruangbin',
//     date: 'Fri, Apr 11',
//     venue: "Stubb's BBQ",
//     friendsInterested: ['SK', 'JL'],
//     imageUrl:
//       'https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMGxpdmUlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzU2NDkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
//   },
// ] as const;

type AvailabilityFilter = 'all' | 'available' | 'soldOut';

type TicketEvent = {
  id: string;
  artist: string;
  venue: string;
  city: string;
  date: string;
  genre?: string;
  minTicketPrice?: number | null;
  maxTicketPrice?: number | null;
  ticketCurrency?: string;
  ticketStatus?: string;
  soldOut?: boolean;
  distanceMiles?: number | null;
  venueLatitude?: number | null;
  venueLongitude?: number | null;
  ticketUrl?: string | null;
  stubHubUrl?: string | null;
  imageUrl: string;
};

type UserLocation = {
  latitude: number;
  longitude: number;
};

type EventsPage = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

const TICKETS_PAGE_SIZE = 50;
const EVENTS_FETCH_SIZE = 200;

function getDistanceMiles(from: UserLocation, to: UserLocation) {
  const earthRadiusMiles = 3958.8;
  const latitudeDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const longitudeDelta = ((to.longitude - from.longitude) * Math.PI) / 180;
  const fromLatitude = (from.latitude * Math.PI) / 180;
  const toLatitude = (to.latitude * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) * Math.cos(toLatitude) * Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function FilterChip({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`rounded-full border px-4 py-2 ${
        active ? 'border-app-primary bg-app-primary' : 'border-app-border bg-app-surface'
      }`.trim()}
      onPress={onPress}
    >
      <AppText className={active ? 'text-app-bg-elevated' : 'text-app-text-muted'} variant="caption">
        {label}
      </AppText>
    </Pressable>
  );
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const firstPage = Math.max(1, currentPage - 2);
  const lastPage = Math.min(totalPages, currentPage + 2);

  return Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index);
}

function PaginationButton({
  active = false,
  disabled = false,
  label,
  onPress,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      className={`h-10 min-w-10 items-center justify-center rounded-[12px] border px-3 ${
        active
          ? 'border-app-primary bg-app-primary'
          : disabled
            ? 'border-app-border bg-app-surface/50'
            : 'border-app-border bg-app-surface'
      }`.trim()}
      disabled={disabled}
      onPress={onPress}
    >
      <AppText
        className={active ? 'text-app-bg-elevated' : disabled ? 'text-app-text-muted/50' : 'text-app-text'}
        variant="bodyStrong"
      >
        {label}
      </AppText>
    </Pressable>
  );
}

export default function TicketsScreen() {
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [pageInfo, setPageInfo] = useState<EventsPage>({
    number: 0,
    size: EVENTS_FETCH_SIZE,
    totalElements: 0,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [maxDistance, setMaxDistance] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState<AvailabilityFilter>('all');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<
    Location.PermissionStatus | 'unknown'
  >('unknown');

  useEffect(() => {
    let ignore = false;

    const loadEvents = async () => {
      setIsLoadingEvents(true);
      setEventsError(null);

      try {
        const eventsUrl = new URL(`${process.env.EXPO_PUBLIC_API_URL}/events`);
        eventsUrl.searchParams.set('page', '0');
        eventsUrl.searchParams.set('size', String(EVENTS_FETCH_SIZE));

        const response = await fetch(eventsUrl.toString());
        const data = await response.json();

        if (ignore) {
          return;
        }

        if (!response.ok || data.error) {
          setEvents([]);
          setEventsError(data.error ?? 'Unable to load tickets.');
          return;
        }

        setEvents(data.events ?? []);
        setPageInfo(
          data.page ?? {
            number: 0,
            size: EVENTS_FETCH_SIZE,
            totalElements: data.events?.length ?? 0,
            totalPages: 1,
          },
        );
      } catch {
        if (!ignore) {
          setEvents([]);
          setEventsError('Unable to load tickets.');
        }
      } finally {
        if (!ignore) {
          setIsLoadingEvents(false);
        }
      }
    };

    void loadEvents();

    return () => {
      ignore = true;
    };
  }, []);

  const requestUserLocation = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    setLocationPermissionStatus(permission.status);

    if (permission.status !== Location.PermissionStatus.GRANTED) {
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  useEffect(() => {
    const showLocationPrompt = async () => {
      const permission = await Location.getForegroundPermissionsAsync();
      setLocationPermissionStatus(permission.status);

      if (permission.status === Location.PermissionStatus.GRANTED) {
        await requestUserLocation();
        return;
      }

      if (permission.canAskAgain) {
        Alert.alert(
          'Use your location?',
          'Concert can calculate accurate distance from you to each venue.',
          [
            { text: 'Not now', style: 'cancel' },
            { text: 'Use location', onPress: () => void requestUserLocation() },
          ],
        );
      }
    };

    void showLocationPrompt();
  }, []);

  const eventsWithDistance = events.map((event) => {
    const userDistanceMiles =
      userLocation &&
      typeof event.venueLatitude === 'number' &&
      typeof event.venueLongitude === 'number'
        ? getDistanceMiles(userLocation, {
            latitude: event.venueLatitude,
            longitude: event.venueLongitude,
          })
        : event.distanceMiles;

    return {
      ...event,
      distanceMiles: userDistanceMiles,
    };
  });

  const genres = [
    'All',
    ...Array.from(
      new Set(
        eventsWithDistance.flatMap((event) =>
          event.genre && event.genre !== 'Undefined' ? [event.genre] : [],
        ),
      ),
    ),
  ];
  const maxDistanceNumber = Number(maxDistance);
  const maxPriceNumber = Number(maxPrice);
  const hasDistanceFilter = maxDistance.trim().length > 0 && Number.isFinite(maxDistanceNumber);
  const hasPriceFilter = maxPrice.trim().length > 0 && Number.isFinite(maxPriceNumber);
  const activeFilterCount =
    (selectedGenre !== 'All' ? 1 : 0) +
    (hasDistanceFilter ? 1 : 0) +
    (hasPriceFilter ? 1 : 0) +
    (availability !== 'all' ? 1 : 0);

  const filteredEvents = eventsWithDistance.filter((event) => {
    if (selectedGenre !== 'All' && event.genre !== selectedGenre) {
      return false;
    }

    if (
      hasDistanceFilter &&
      (typeof event.distanceMiles !== 'number' || event.distanceMiles > maxDistanceNumber)
    ) {
      return false;
    }

    if (
      hasPriceFilter &&
      (typeof event.minTicketPrice !== 'number' || event.minTicketPrice > maxPriceNumber)
    ) {
      return false;
    }

    if (availability === 'available' && event.soldOut) {
      return false;
    }

    if (availability === 'soldOut' && !event.soldOut) {
      return false;
    }

    return true;
  });
  const totalPages = Math.max(Math.ceil(filteredEvents.length / TICKETS_PAGE_SIZE), 1);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * TICKETS_PAGE_SIZE,
    currentPage * TICKETS_PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [availability, maxDistance, maxPrice, selectedGenre]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const resetFilters = () => {
    setSelectedGenre('All');
    setMaxDistance('');
    setMaxPrice('');
    setAvailability('all');
  };
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Ticket options should feel transparent, fast to compare, and connected to your plans."
          title="Tickets"
        />

        <AppCard className="gap-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 gap-1">
              <AppText variant="sectionTitle">Filter tickets</AppText>
              <AppText muted variant="caption">
                Narrow events by genre, distance, price, and availability.
              </AppText>
              {locationPermissionStatus !== Location.PermissionStatus.GRANTED ? (
                <Pressable onPress={() => void requestUserLocation()}>
                  <AppText className="text-app-primary" variant="caption">
                    Use my location for accurate distance
                  </AppText>
                </Pressable>
              ) : null}
            </View>
            {activeFilterCount > 0 ? (
              <Pressable onPress={resetFilters}>
                <AppText className="text-app-primary" variant="caption">
                  Reset
                </AppText>
              </Pressable>
            ) : null}
          </View>

          <View className="gap-2">
            <AppText variant="bodyStrong">Genre</AppText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2 pr-4">
                {genres.map((genre) => (
                  <FilterChip
                    active={selectedGenre === genre}
                    key={genre}
                    label={genre}
                    onPress={() => setSelectedGenre(genre)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 gap-2">
              <AppText variant="bodyStrong">Max distance</AppText>
              <TextInput
                className="rounded-[14px] border border-app-border bg-app-surface px-4 py-3 text-app-text"
                inputMode="numeric"
                onChangeText={setMaxDistance}
                placeholder="Any miles"
                placeholderTextColor="#7a7d73"
                value={maxDistance}
              />
            </View>
            <View className="flex-1 gap-2">
              <AppText variant="bodyStrong">Lowest price</AppText>
              <TextInput
                className="rounded-[14px] border border-app-border bg-app-surface px-4 py-3 text-app-text"
                inputMode="numeric"
                onChangeText={setMaxPrice}
                placeholder="Any $"
                placeholderTextColor="#7a7d73"
                value={maxPrice}
              />
            </View>
          </View>

          <View className="gap-2">
            <AppText variant="bodyStrong">Availability</AppText>
            <View className="flex-row flex-wrap gap-2">
              <FilterChip active={availability === 'all'} label="All" onPress={() => setAvailability('all')} />
              <FilterChip
                active={availability === 'available'}
                label="Available"
                onPress={() => setAvailability('available')}
              />
              <FilterChip
                active={availability === 'soldOut'}
                label="Sold out"
                onPress={() => setAvailability('soldOut')}
              />
            </View>
          </View>

          <AppText muted variant="caption">
            Showing {paginatedEvents.length} of {filteredEvents.length} matching events from{' '}
            {eventsWithDistance.length} loaded
            {pageInfo.totalElements > eventsWithDistance.length ? ` of ${pageInfo.totalElements} available` : ''}
          </AppText>
        </AppCard>

        {isLoadingEvents && events.length === 0 ? (
          <AppCard className="items-center gap-3">
            <ActivityIndicator color="#4caf50" />
            <AppText muted variant="caption">
              Loading tickets
            </AppText>
          </AppCard>
        ) : null}

        {eventsError ? (
          <AppCard className="items-center gap-2">
            <AppText variant="bodyStrong">Tickets could not load.</AppText>
            <AppText muted className="text-center" variant="caption">
              {eventsError}
            </AppText>
          </AppCard>
        ) : null}

        {paginatedEvents.map((event) => (
          <ConcertCardTicketsPage
            key={event.id}
            artist={event.artist}
            venue={event.venue}
            city={event.city}
            date={event.date}
            genre={event.genre}
            minTicketPrice={event.minTicketPrice}
            maxTicketPrice={event.maxTicketPrice}
            ticketCurrency={event.ticketCurrency}
            ticketStatus={event.ticketStatus}
            soldOut={event.soldOut}
            distanceMiles={event.distanceMiles}
            ticketUrl={event.ticketUrl}
            stubHubUrl={event.stubHubUrl}
            imageUrl={event.imageUrl}
          />
        ))}

        {events.length > 0 && filteredEvents.length === 0 ? (
          <AppCard className="items-center gap-2">
            <AppText variant="bodyStrong">No tickets match those filters.</AppText>
            <AppText muted className="text-center" variant="caption">
              Try widening the distance, raising the price limit, or resetting filters.
            </AppText>
          </AppCard>
        ) : null}

        {filteredEvents.length > TICKETS_PAGE_SIZE ? (
          <AppCard className="gap-4">
            <View className="flex-row items-center justify-between gap-3">
              <Pressable
                className={`h-10 w-10 items-center justify-center rounded-[12px] border border-app-border bg-app-surface ${
                  currentPage === 1 ? 'opacity-40' : ''
                }`.trim()}
                disabled={currentPage === 1 || isLoadingEvents}
                onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <Ionicons color="#20221c" name="chevron-back" size={18} />
              </Pressable>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2 px-1">
                  {visiblePages.map((page) => (
                    <PaginationButton
                      active={page === currentPage}
                      disabled={isLoadingEvents}
                      key={page}
                      label={String(page)}
                      onPress={() => setCurrentPage(page)}
                    />
                  ))}
                </View>
              </ScrollView>

              <Pressable
                className={`h-10 w-10 items-center justify-center rounded-[12px] border border-app-border bg-app-surface ${
                  currentPage >= totalPages ? 'opacity-40' : ''
                }`.trim()}
                disabled={currentPage >= totalPages || isLoadingEvents}
                onPress={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                <Ionicons color="#20221c" name="chevron-forward" size={18} />
              </Pressable>
            </View>

            <AppText muted className="text-center" variant="caption">
              Page {currentPage} of {totalPages}
            </AppText>
          </AppCard>
        ) : null}
      </View>
    </AppScreen>
  );
}
