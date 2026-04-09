import { ScrollView, View } from 'react-native';

import ConcertDiscoverHighlightCard from '@/app/components/concert-discover-highlight-card';
import ConcertSectionHeader from '@/app/components/concert-section-header';
import ConcertSimpleInfoCard from '@/app/components/concert-simple-info-card';
import ConcertTrendingCard from '@/app/components/concert-trending-card';
import AppScreen from '@/app/components/ui/app-screen';

const highlightedEvent = {
  title: 'Find events that actually match your taste',
  subtitle: 'Fresh recommendations, social signal, and venue context in one scroll.',
  imageUrl:
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

const discoveryRows = [
  {
    title: 'Friends with plans',
    description: 'See where your group already has momentum before you commit.',
    icon: 'people-outline' as const,
  },
  {
    title: 'Nearby tonight',
    description: 'Surface what is happening close to you without opening a separate search flow.',
    icon: 'location-outline' as const,
  },
  {
    title: 'Price-aware picks',
    description: 'Balance taste match with real ticket options so recommendations feel useful.',
    icon: 'ticket-outline' as const,
  },
] as const;

const trendingEvents = [
  {
    artist: 'Cigarettes After Sex',
    genre: 'Dream Pop',
    imageUrl:
      'https://images.unsplash.com/photo-1619973226698-b77a5b5dd14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    trendingScore: '+28%',
  },
  {
    artist: 'Kaytranada',
    genre: 'Electronic',
    imageUrl:
      'https://images.unsplash.com/photo-1761163924901-2ed45af2c8c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    trendingScore: '+24%',
  },
] as const;

export default function DiscoverScreen() {
  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Search, recommendations, and social context should feel like one product."
          title="Discover"
        />

        <ConcertDiscoverHighlightCard {...highlightedEvent} />

        <View className="gap-4">
          <ConcertSectionHeader title="Browse smarter" />
          <View className="gap-3">
            {discoveryRows.map((row) => (
              <ConcertSimpleInfoCard key={row.title} {...row} />
            ))}
          </View>
        </View>

        <View className="gap-4">
          <ConcertSectionHeader title="Trending near you" />
          <ScrollView
            className="-mx-6"
            contentContainerStyle={{ paddingHorizontal: 24 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {trendingEvents.map((event) => (
              <ConcertTrendingCard key={event.artist} {...event} />
            ))}
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
}
