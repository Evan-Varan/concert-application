import { View } from 'react-native';

import ConcertTicketProviderCard from '@/app/components/concert-ticket-provider-card';
import AppButton from '@/app/components/ui/app-button';
import AppText from '@/app/components/ui/app-text';

interface ConcertTicketComparisonSectionProps {
  eventName: string;
}

const ticketProviders = [
  {
    provider: 'SeatGeek',
    price: 89,
    originalPrice: 125,
    seatQuality: 'excellent' as const,
    features: ['Section 102, Row D', 'Instant delivery'],
    bestDeal: true,
  },
  {
    provider: 'Ticketmaster',
    price: 95,
    seatQuality: 'excellent' as const,
    features: ['Section 101, Row F', 'Mobile entry'],
  },
  {
    provider: 'StubHub',
    price: 78,
    originalPrice: 98,
    seatQuality: 'good' as const,
    features: ['Section 205, Row B', 'FanProtect guarantee'],
  },
] as const;

export default function ConcertTicketComparisonSection({
  eventName,
}: ConcertTicketComparisonSectionProps) {
  return (
    <View className="gap-4">
      <View className="flex-row items-end justify-between">
        <View className="gap-1">
          <AppText variant="sectionTitle">Compare Ticket Prices</AppText>
          <AppText muted variant="caption">
            For {eventName}
          </AppText>
        </View>
        <AppButton tone="secondary">See All</AppButton>
      </View>

      <View className="gap-3">
        {ticketProviders.map((provider) => (
          <ConcertTicketProviderCard key={provider.provider} {...provider} />
        ))}
      </View>
    </View>
  );
}
