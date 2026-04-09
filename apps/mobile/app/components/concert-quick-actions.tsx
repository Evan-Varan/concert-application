import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import AppText from '@/app/components/ui/app-text';
import { useThemeColor } from '@/hooks/use-theme-color';

const actions = [
  { icon: 'person-add-outline', label: 'Invite Friends', color: 'warm' },
  { icon: 'compass-outline', label: 'Browse Events', color: 'primary' },
  { icon: 'people-outline', label: 'View Groups', color: 'cool' },
] as const;

export default function ConcertQuickActions() {
  const primaryColor = useThemeColor({}, 'tint');
  const warmColor = '#ff8a4c';
  const coolColor = '#21c7c2';
  const getColor = (tone: 'warm' | 'primary' | 'cool') =>
    tone === 'warm' ? warmColor : tone === 'cool' ? coolColor : primaryColor;

  return (
    <View className="flex-row gap-3">
      {actions.map((action) => (
        <Pressable
          key={action.label}
          className="flex-1 items-center gap-3 rounded-[16px] border border-app-border bg-app-bg-elevated px-3 py-4"
        >
          <View className="h-12 w-12 items-center justify-center rounded-full bg-app-surface">
            <View
              className="absolute h-12 w-12 rounded-full"
              style={{ backgroundColor: getColor(action.color), opacity: 0.15 }}
            />
            <Ionicons color={getColor(action.color)} name={action.icon} size={22} />
          </View>
          <AppText className="text-center" variant="caption">
            {action.label}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}
