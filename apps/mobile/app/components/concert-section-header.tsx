import { View } from 'react-native';

import AppText from '@/app/components/ui/app-text';

interface ConcertSectionHeaderProps {
  subtitle?: string;
  title: string;
}

export default function ConcertSectionHeader({ subtitle, title }: ConcertSectionHeaderProps) {
  return (
    <View className="gap-1">
      <AppText variant="sectionTitle">{title}</AppText>
      {subtitle ? <AppText muted variant="caption">{subtitle}</AppText> : null}
    </View>
  );
}
