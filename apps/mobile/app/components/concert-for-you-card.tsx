import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, View } from 'react-native';

import AppBadge from '@/app/components/ui/app-badge';
import AppText from '@/app/components/ui/app-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ConcertForYouCardProps {
  artist: string;
  date: string;
  distance: string;
  featured?: boolean;
  friendsInterested?: readonly string[];
  imageUrl: string;
  matchScore: number;
  venue: string;
}

export default function ConcertForYouCard({
  artist,
  date,
  distance,
  featured = false,
  friendsInterested,
  imageUrl,
  matchScore,
  venue,
}: ConcertForYouCardProps) {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <ImageBackground
      className="mr-4 h-96 w-72 overflow-hidden rounded-[24px]"
      imageStyle={{ borderRadius: 24 }}
      source={{ uri: imageUrl }}
    >
      <View className="absolute inset-0 rounded-[24px] bg-black/20" />
      <View className="absolute inset-0 rounded-[24px] bg-black/35" />
      {featured ? (
        <View className="absolute inset-0 rounded-[24px] bg-app-primary/10" />
      ) : null}
      <View className="flex-1 justify-between p-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-center gap-1.5">
            <Ionicons color={primaryColor} name="sparkles-outline" size={14} />
            <AppBadge tone="match">{matchScore}% Match</AppBadge>
          </View>

          <View className="flex-row -space-x-2">
            {friendsInterested?.slice(0, 3).map((friend) => (
              <View
                key={friend}
                className="h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-app-accent-warm"
                style={{ shadowColor: '#000000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
              >
                <AppText className="text-app-bg-elevated" variant="caption">
                  {friend}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-3">
          <AppText className="text-app-bg-elevated" variant={featured ? 'title' : 'headline'}>
            {artist}
          </AppText>

          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Ionicons color="#ffffff" name="calendar-outline" size={15} />
              <AppText className="text-app-bg-elevated" variant="caption">
                {date}
              </AppText>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons color="#ffffff" name="location-outline" size={15} />
              <AppText className="text-app-bg-elevated" variant="caption">
                {venue} • {distance}
              </AppText>
            </View>

            {friendsInterested?.length ? (
              <View className="flex-row items-center gap-2">
                <Ionicons color="#ffffff" name="people-outline" size={15} />
                <AppText className="text-app-bg-elevated" variant="caption">
                  {friendsInterested.length} friends interested
                </AppText>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
