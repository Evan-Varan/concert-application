import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { elevation, radius, spacing } from '@/constants/design-system';

interface AppCardProps extends ViewProps {
  children: ReactNode;
  tone?: 'surface' | 'primary';
}

export default function AppCard({
  children,
  className = '',
  style,
  tone = 'surface',
  ...props
}: AppCardProps) {
  const toneClassName =
    tone === 'primary'
      ? 'border-app-primary/20 bg-app-primary-soft'
      : 'border-app-border bg-app-bg-elevated';

  return (
    <View
      className={`rounded-[22px] border p-5 ${toneClassName} ${className}`.trim()}
      style={[{ borderRadius: radius.lg, padding: spacing.xl }, elevation.md, style]}
      {...props}
    >
      {children}
    </View>
  );
}
