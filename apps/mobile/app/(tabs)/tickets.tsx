import { View } from 'react-native';
import { useEffect,useState } from 'react';

import ConcertSectionHeader from '@/app/components/concert-section-header';
import AppScreen from '@/app/components/ui/app-screen';
import ConcertSocialEventCard from '../components/concert-social-event-card';
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




export default function TicketsScreen() {
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
        <ConcertSectionHeader
          subtitle="Ticket options should feel transparent, fast to compare, and connected to your plans."
          title="Tickets"
        />

        {events.map((event) =>(
          <ConcertCardTicketsPage
            key ={event.id}
            artist={event.artist}
            venue={event.venue}
            city ={event.city}
            date = {event.date}
            imageUrl={event.imageUrl} 
        />))}
      </View>
    </AppScreen>
  );
}
