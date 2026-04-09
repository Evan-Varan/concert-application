import { Image, View } from 'react-native';

import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';

interface ConcertTrendingCardProps {
  artist: string;
  genre: string;
  imageUrl: string;
  trendingScore: string;
}

export default function ConcertTrendingCard({
  artist,
  genre,
  imageUrl,
  trendingScore,
}: ConcertTrendingCardProps) {
  return (
    <AppCard className="mr-3 w-40 overflow-hidden p-0">
      <Image className="h-40 w-full" source={{ uri: imageUrl }} />
      <View className="gap-1 p-3">
        <View className="self-end rounded-md bg-app-accent-warm/15 px-2 py-1">
          <AppText className="text-app-accent-warm" variant="caption">
            {trendingScore}
          </AppText>
        </View>
        <AppText variant="bodyStrong">{artist}</AppText>
        <AppText muted variant="caption">
          {genre}
        </AppText>
      </View>
    </AppCard>
  );
}
