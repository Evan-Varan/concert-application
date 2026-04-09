import { ReactNode } from 'react';
import { View } from 'react-native';

import AppText from '@/app/components/ui/app-text';

interface AppBannerProps {
  children: ReactNode;
  tone?: 'info' | 'success';
}

export default function AppBanner({ children, tone = 'info' }: AppBannerProps) {
  const toneClassName =
    tone === 'success'
      ? 'border-app-primary/30 bg-app-primary/10'
      : 'border-app-border bg-app-surface';

  const textClassName = tone === 'success' ? 'text-app-primary-strong' : 'text-app-text';

  return (
    <View className={`rounded-xl border px-3 py-2 ${toneClassName}`.trim()}>
      <AppText className={textClassName} variant="caption">
        {children}
      </AppText>
    </View>
  );
}
