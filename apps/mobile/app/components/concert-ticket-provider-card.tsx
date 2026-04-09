import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import AppBadge from '@/app/components/ui/app-badge';
import AppButton from '@/app/components/ui/app-button';
import AppBanner from '@/app/components/ui/app-banner';
import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';

interface ConcertTicketProviderCardProps {
  bestDeal?: boolean;
  features: readonly string[];
  originalPrice?: number;
  price: number;
  provider: string;
  seatQuality: 'excellent' | 'good' | 'standard';
}

const qualityLabel = {
  excellent: { label: 'Excellent Seats', stars: '⭐⭐⭐' },
  good: { label: 'Good Seats', stars: '⭐⭐' },
  standard: { label: 'Standard Seats', stars: '⭐' },
} as const;

export default function ConcertTicketProviderCard({
  bestDeal = false,
  features,
  originalPrice,
  price,
  provider,
  seatQuality,
}: ConcertTicketProviderCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <AppCard className={bestDeal ? 'border-app-primary/30 bg-app-primary-soft' : ''}>
      <View className="gap-4">
        {bestDeal ? (
          <View className="absolute -right-1 -top-1 flex-row items-center gap-1 rounded-full bg-app-primary px-3 py-1.5">
            <Ionicons color="#ffffff" name="star" size={12} />
            <AppText className="text-app-bg-elevated" variant="caption">
              Best Deal
            </AppText>
          </View>
        ) : null}

        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Ionicons color="#5f5f5f" name="ticket-outline" size={16} />
              <AppText variant="bodyStrong">{provider}</AppText>
            </View>
            <AppText muted variant="caption">
              {qualityLabel[seatQuality].stars} {qualityLabel[seatQuality].label}
            </AppText>
          </View>

          <View className="items-end gap-1">
            <AppText variant="headline">${price}</AppText>
            {originalPrice ? (
              <View className="flex-row items-center gap-1">
              <AppText muted variant="caption">
                ${originalPrice}
              </AppText>
                <AppBadge tone="warm">-{discount}%</AppBadge>
              </View>
            ) : null}
          </View>
        </View>

        <View className="gap-2">
          {features.slice(0, 2).map((feature) => (
            <View key={feature} className="flex-row items-center gap-2">
              <Ionicons color="#4caf50" name="checkmark" size={14} />
              <AppText muted variant="caption">
                {feature}
              </AppText>
            </View>
          ))}
        </View>

        {bestDeal ? <AppBanner tone="success">Lowest verified price right now</AppBanner> : null}

        <AppButton tone={bestDeal ? 'primary' : 'secondary'}>View Tickets</AppButton>
      </View>
    </AppCard>
  );
}
