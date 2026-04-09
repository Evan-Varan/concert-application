import { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { typography } from '@/constants/design-system';

type AppTextVariant =
  | 'eyebrow'
  | 'title'
  | 'headline'
  | 'sectionTitle'
  | 'body'
  | 'bodyStrong'
  | 'caption';

interface AppTextProps extends TextProps {
  children: ReactNode;
  muted?: boolean;
  variant?: AppTextVariant;
}

const variantStyles = StyleSheet.create(typography);

export default function AppText({
  children,
  className = '',
  muted = false,
  variant = 'body',
  ...props
}: AppTextProps) {
  const hasExplicitColor = /\btext-app-[\w-]+/.test(className);
  const colorClass = hasExplicitColor ? '' : muted ? 'text-app-text-muted' : 'text-app-text';

  return (
    <Text className={`${colorClass} ${className}`.trim()} style={variantStyles[variant]} {...props}>
      {children}
    </Text>
  );
}
