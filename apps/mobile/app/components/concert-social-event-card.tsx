import { Image, View } from 'react-native';

import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';

interface ConcertSocialEventCardProps {
  artist: string;
  date: string;
  friendsInterested: readonly string[];
  imageUrl: string;
  venue: string;
}

export default function ConcertSocialEventCard({
  artist,
  date,
  friendsInterested,
  imageUrl,
  venue,
}: ConcertSocialEventCardProps) {
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

          <View className="mt-2 flex-row items-center gap-2">
            <View className="flex-row -space-x-1.5">
              {friendsInterested.slice(0, 3).map((friend) => (
                <View
                  key={friend}
                  className="h-6 w-6 items-center justify-center rounded-full border-2 border-app-bg-elevated bg-app-accent-cool"
                >
                  <AppText className="text-app-bg-elevated" variant="caption">
                    {friend}
                  </AppText>
                </View>
              ))}
            </View>
            <AppText muted variant="caption">
              {friendsInterested.length} friends interested
            </AppText>
          </View>
        </View>
      </View>
    </AppCard>
  );
}
