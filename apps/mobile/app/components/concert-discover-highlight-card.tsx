import { ImageBackground, View } from 'react-native';

import AppButton from '@/app/components/ui/app-button';
import AppText from '@/app/components/ui/app-text';

interface ConcertDiscoverHighlightCardProps {
  imageUrl: string;
  subtitle: string;
  title: string;
}

export default function ConcertDiscoverHighlightCard({
  imageUrl,
  subtitle,
  title,
}: ConcertDiscoverHighlightCardProps) {
  return (
    <ImageBackground
      className="h-56 overflow-hidden rounded-[24px]"
      imageStyle={{ borderRadius: 24 }}
      source={{ uri: imageUrl }}
    >
      <View className="flex-1 justify-end bg-black/45 p-5">
        <View className="gap-3">
          <AppText className="text-app-bg-elevated" variant="headline">
            {title}
          </AppText>
          <AppText className="text-app-bg-elevated" variant="caption">
            {subtitle}
          </AppText>
          <AppButton className="self-start px-5" tone="primary">
            Explore
          </AppButton>
        </View>
      </View>
    </ImageBackground>
  );
}
