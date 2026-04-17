import { Image, View } from 'react-native';

import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';

interface ConcertCardTicketsPageProps {
  artist: string;
  venue: string;
  city: string;
  date: string;
  imageUrl: string;
}

export default function ConcertCardTicketsPage({
  artist,
  venue,
  city,
  date,
  imageUrl,
}: ConcertCardTicketsPageProps) {
  return (
    <AppCard className="p-3">
      <View className="flex-row gap-3">
        <Image className="h-20 w-20 rounded-[16px]" source={{ uri: imageUrl }} />

        <View className="flex-1 gap-1">
          <AppText variant="bodyStrong">{artist}</AppText>
          <AppText muted variant="caption">
            {date}
          </AppText>
          <AppText muted variant="caption">
            {venue}
          </AppText>
          <AppText muted variant="caption">
            {city}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
