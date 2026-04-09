import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import AppText from '@/app/components/ui/app-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ConcertHomeHeaderProps {
  onThemeToggle?: () => void;
}

export default function ConcertHomeHeader({ onThemeToggle }: ConcertHomeHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const mutedColor = useThemeColor({}, 'icon');

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Ionicons color={mutedColor} name="location-outline" size={20} />
        <View>
          <AppText variant="bodyStrong">Austin, TX</AppText>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-full bg-app-surface"
          onPress={onThemeToggle}
        >
          <Ionicons color={mutedColor} name={colorScheme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={18} />
        </Pressable>

        <View className="h-10 w-10 rounded-full bg-app-accent-cool p-[2px]">
          <View className="flex-1 items-center justify-center rounded-full bg-app-primary">
            <AppText className="text-app-bg-elevated" variant="caption">
              JD
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
