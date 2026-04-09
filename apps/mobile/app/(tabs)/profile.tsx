import { View } from 'react-native';

import ConcertSectionHeader from '@/app/components/concert-section-header';
import ConcertSimpleInfoCard from '@/app/components/concert-simple-info-card';
import AppScreen from '@/app/components/ui/app-screen';

const profileRows = [
  {
    title: 'Taste profile',
    description: 'Shape recommendations by genre, venue size, and how social you want plans to be.',
    icon: 'sparkles-outline' as const,
  },
  {
    title: 'Notification controls',
    description: 'Tune alerts for artist drops, price changes, and friend activity.',
    icon: 'notifications-outline' as const,
  },
  {
    title: 'Connected services',
    description: 'Bring in your listening history and any accounts that improve event matching.',
    icon: 'link-outline' as const,
  },
] as const;

export default function ProfileScreen() {
  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Your music identity and account preferences should feel personal, not administrative."
          title="Profile"
        />

        <View className="gap-3">
          {profileRows.map((row) => (
            <ConcertSimpleInfoCard key={row.title} {...row} />
          ))}
        </View>
      </View>
    </AppScreen>
  );
}
