import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import AppButton from '@/app/components/ui/app-button';
import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ConcertGroupPlanningCard() {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <AppCard tone="primary">
      <View className="flex-row items-center gap-4">
        <View className="h-14 w-14 items-center justify-center rounded-[18px] bg-app-primary-soft">
          <Ionicons color={primaryColor} name="people-outline" size={28} />
        </View>

        <View className="flex-1 gap-1">
          <AppText variant="sectionTitle">Plan with Friends</AppText>
          <AppText muted>Coordinate concert plans with your crew</AppText>
        </View>

        <AppButton className="min-h-0 px-4 py-0" tone="primary">
          +
        </AppButton>
      </View>
    </AppCard>
  );
}
