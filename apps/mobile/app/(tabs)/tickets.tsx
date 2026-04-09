import { View } from 'react-native';

import ConcertSectionHeader from '@/app/components/concert-section-header';
import ConcertTicketComparisonSection from '@/app/components/concert-ticket-comparison-section';
import ConcertTicketProviderCard from '@/app/components/concert-ticket-provider-card';
import AppScreen from '@/app/components/ui/app-screen';

export default function TicketsScreen() {
  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Ticket options should feel transparent, fast to compare, and connected to your plans."
          title="Tickets"
        />

        <ConcertTicketComparisonSection eventName="Japanese Breakfast" />

        <ConcertTicketProviderCard
          features={['Section 204, Row G', 'Secure checkout']}
          price={112}
          provider="AXS Resale"
          seatQuality="good"
        />
      </View>
    </AppScreen>
  );
}
