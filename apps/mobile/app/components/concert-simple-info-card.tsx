import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ConcertSimpleInfoCardProps {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}

export default function ConcertSimpleInfoCard({
  description,
  icon,
  title,
}: ConcertSimpleInfoCardProps) {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <AppCard>
      <View className="gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-app-surface">
          <Ionicons color={primaryColor} name={icon} size={18} />
        </View>
        <View className="gap-1">
          <AppText variant="bodyStrong">{title}</AppText>
          <AppText muted variant="caption">
            {description}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}
