import { ScrollView, View } from 'react-native';
import { useState, useEffect } from 'react';

import ConcertForYouCard from '@/app/components/concert-for-you-card';
import ConcertGroupPlanningCard from '@/app/components/concert-group-planning-card';
import ConcertHomeHeader from '@/app/components/concert-home-header';
import ConcertQuickActions from '@/app/components/concert-quick-actions';
import ConcertSocialEventCard from '@/app/components/concert-social-event-card';
import ConcertTicketComparisonSection from '@/app/components/concert-ticket-comparison-section';
import ConcertTrendingCard from '@/app/components/concert-trending-card';
import AppScreen from '@/app/components/ui/app-screen';
import AppText from '@/app/components/ui/app-text';

const forYouEvents = [
  {
    artist: 'The Midnight',
    date: 'Fri, Apr 11 • 8:00 PM',
    venue: "Stubb's BBQ",
    distance: '2.3 mi',
    matchScore: 95,
    friendsInterested: ['AM', 'SK', 'JL'],
    imageUrl:
      'https://images.unsplash.com/photo-1619973226698-b77a5b5dd14b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBsaWdodHMlMjBtdXNpYyUyMGZlc3RpdmFsfGVufDF8fHx8MTc3NTU5MDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    artist: 'boygenius',
    date: 'Sat, Apr 12 • 9:00 PM',
    venue: 'Moody Theater',
    distance: '3.1 mi',
    matchScore: 88,
    friendsInterested: ['SK'],
    imageUrl:
      'https://images.unsplash.com/photo-1775442904577-9d3fa9f7525b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc1NjYzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    artist: 'ODESZA',
    date: 'Sun, Apr 13 • 7:30 PM',
    venue: 'Germania Insurance',
    distance: '4.5 mi',
    matchScore: 92,
    friendsInterested: ['AM', 'JL'],
    imageUrl:
      'https://images.unsplash.com/photo-1761163924901-2ed45af2c8c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBESiUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NTY2MzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
] as const;

const socialEvents = [
  {
    artist: 'Japanese Breakfast',
    date: 'Thu, Apr 10',
    venue: 'Empire Control Room',
    friendsInterested: ['AM', 'SK', 'JL', 'RP'],
    imageUrl:
      'https://images.unsplash.com/photo-1767969457898-51d5e9cf81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwYmFuZCUyMHBlcmZvcm1hbmNlJTIwc3RhZ2V8ZW58MXx8fHwxNzc1NjYzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    artist: 'Khruangbin',
    date: 'Fri, Apr 11',
    venue: "Stubb's BBQ",
    friendsInterested: ['SK', 'JL'],
    imageUrl:
      'https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMGxpdmUlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzU2NDkwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
] as const;

const trendingEvents = [
  {
    artist: 'Bad Bunny',
    genre: 'Latin',
    imageUrl:
      'https://images.unsplash.com/photo-1774012686863-cab983b435fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBhcnRpc3QlMjBzdGFnZSUyMGNvbmNlcnR8ZW58MXx8fHwxNzc1NjYzMTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    trendingScore: '+45%',
  },
  {
    artist: 'Flume',
    genre: 'Electronic',
    imageUrl:
      'https://images.unsplash.com/photo-1761163924901-2ed45af2c8c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBESiUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc3NTY2MzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    trendingScore: '+38%',
  },
  {
    artist: 'Tame Impala',
    genre: 'Indie Rock',
    imageUrl:
      'https://images.unsplash.com/photo-1775442904577-9d3fa9f7525b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMHJvY2slMjBjb25jZXJ0JTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzc1NjYzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    trendingScore: '+32%',
  },
] as const;



export default function HomeScreen() {
  const [events, setEvents] = useState<
    {
      id: string;
      artist: string;
      venue: string;
      city: string;
      date: string;
      imageUrl: string;
    }[]
    >([]);
  
  useEffect(() =>{
    const loadEvents = async () => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/events`);
      const data = await response.json();
  
      setEvents(data.events);
    };
      loadEvents();
    }, []);
  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertHomeHeader />

        <View className="gap-2">
          <AppText variant="sectionTitle">For You This Week</AppText>
          <AppText muted>Based on your listening preferences</AppText>
        </View>

        <ScrollView
          className="-mx-6"
          contentContainerStyle={{ paddingHorizontal: 24 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {events.map((event) => (
            <ConcertForYouCard 
              key = {event.id}
              artist = {event.artist}
              venue = {event.venue}
              imageUrl={event.imageUrl}
              date = {event.date}
              
            />
          ))}
        </ScrollView>

        <View className="gap-4">
          <AppText variant="sectionTitle">Your Friends Are Into</AppText>
          <View className="gap-3">
            {socialEvents.map((event) => (
              <ConcertSocialEventCard key={event.artist} {...event} />
            ))}
          </View>
        </View>

        <ConcertTicketComparisonSection eventName="The Midnight" />

        <ConcertGroupPlanningCard />

        <View className="gap-4">
          <AppText variant="sectionTitle">Quick Actions</AppText>
          <ConcertQuickActions />
        </View>

        <View className="gap-4">
          <AppText variant="sectionTitle">Trending Near You</AppText>
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
