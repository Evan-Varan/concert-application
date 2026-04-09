import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { AppTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const tabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  discover: 'search-outline',
  tickets: 'ticket-outline',
  groups: 'people-outline',
  profile: 'person-outline',
};

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = AppTheme[colorScheme];

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: {
          backgroundColor: palette.bg,
        },
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: palette.bgElevated,
          borderTopColor: palette.border,
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 1,
          marginHorizontal: 0,
          marginBottom: 0,
          borderRadius: 0,
          position: 'absolute',
          shadowColor: '#000000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
          elevation: 4,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="discover" options={{ title: 'Discover' }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tickets' }} />
      <Tabs.Screen name="groups" options={{ title: 'Groups' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
