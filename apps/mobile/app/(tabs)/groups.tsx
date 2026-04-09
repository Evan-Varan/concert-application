import { View } from 'react-native';

import ConcertGroupPlanningCard from '@/app/components/concert-group-planning-card';
import ConcertSectionHeader from '@/app/components/concert-section-header';
import ConcertSimpleInfoCard from '@/app/components/concert-simple-info-card';
import AppScreen from '@/app/components/ui/app-screen';

const planningRows = [
  {
    title: 'Attendance status',
    description: 'Keep track of who is in, out, or still deciding without leaving the event flow.',
    icon: 'checkmark-circle-outline' as const,
  },
  {
    title: 'Shared plans',
    description: 'Group chats, venue timing, and ticket context should live together.',
    icon: 'chatbubble-ellipses-outline' as const,
  },
] as const;

export default function GroupsScreen() {
  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Coordinate nights out without turning the app into a generic chat product."
          title="Groups"
        />

        <ConcertGroupPlanningCard />

        <View className="gap-3">
          {planningRows.map((row) => (
            <ConcertSimpleInfoCard key={row.title} {...row} />
          ))}
        </View>
      </View>
    </AppScreen>
  );
}
