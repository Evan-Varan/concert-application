import { ReactNode } from 'react';
import { View } from 'react-native';

import AppText from '@/app/components/ui/app-text';

interface AppBadgeProps {
  children: ReactNode;
  tone?: 'default' | 'match' | 'warm';
}

export default function AppBadge({ children, tone = 'default' }: AppBadgeProps) {
  const toneClassName =
    tone === 'match'
      ? 'border-app-primary/30 bg-app-primary/20'
      : tone === 'warm'
        ? 'border-app-accent-warm/40 bg-app-accent-warm/15'
        : 'border-app-border bg-app-surface';

  const textClassName =
    tone === 'match'
      ? 'text-app-primary-foreground'
      : tone === 'warm'
        ? 'text-app-accent-warm'
        : 'text-app-text-muted';

  return (
    <View className={`rounded-full border px-3 py-1.5 ${toneClassName}`.trim()}>
      <AppText className={textClassName} variant="caption">
        {children}
      </AppText>
    </View>
  );
}
