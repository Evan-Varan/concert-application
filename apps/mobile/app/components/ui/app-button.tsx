import { ReactNode } from 'react';
import { Pressable, PressableProps } from 'react-native';

import AppText from '@/app/components/ui/app-text';
import { radius, spacing } from '@/constants/design-system';

interface AppButtonProps extends PressableProps {
  children: ReactNode;
  tone?: 'primary' | 'secondary';
}

export default function AppButton({
  children,
  className = '',
  style,
  tone = 'primary',
  ...props
}: AppButtonProps) {
  const toneClassName =
    tone === 'primary'
      ? 'bg-app-primary border-app-primary'
      : 'bg-app-surface border-app-border';

  const textClassName = tone === 'primary' ? 'text-app-bg-elevated' : 'text-app-text';

  return (
    <Pressable
      className={`items-center justify-center rounded-[12px] border ${toneClassName} ${className}`.trim()}
      style={(state) => [
        {
          borderRadius: radius.sm,
          minHeight: 42,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          opacity: state.pressed ? 0.9 : 1,
          transform: [{ scale: state.pressed ? 0.99 : 1 }],
          shadowColor: tone === 'primary' ? '#4caf50' : '#000000',
          shadowOpacity: tone === 'primary' ? 0.18 : 0.04,
          shadowRadius: tone === 'primary' ? 12 : 6,
          shadowOffset: { width: 0, height: tone === 'primary' ? 4 : 2 },
          elevation: tone === 'primary' ? 3 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <AppText className={textClassName} variant="bodyStrong">
        {children}
      </AppText>
    </Pressable>
  );
}
