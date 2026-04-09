import { Platform, TextStyle, ViewStyle } from 'react-native';

import { Fonts } from '@/constants/theme';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  full: 999,
} as const;

export const elevation: Record<'sm' | 'md' | 'lg', ViewStyle> = {
  sm: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  lg: {
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
};

export const typography: Record<
  'eyebrow' | 'title' | 'headline' | 'sectionTitle' | 'body' | 'bodyStrong' | 'caption',
  TextStyle
> = {
  eyebrow: {
    fontFamily: Platform.select({ web: Fonts.rounded, default: 'Sora_600SemiBold' }),
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: Platform.OS === 'web' ? '600' : undefined,
  },
  headline: {
    fontFamily: Fonts.rounded,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: Platform.OS === 'web' ? '600' : undefined,
  },
  sectionTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: Platform.OS === 'web' ? '600' : undefined,
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: Platform.OS === 'web' ? '400' : undefined,
  },
  bodyStrong: {
    fontFamily: Platform.select({ web: Fonts.sans, default: 'Inter_500Medium' }),
    fontSize: 15,
    lineHeight: 22,
    fontWeight: Platform.OS === 'web' ? '500' : undefined,
  },
  caption: {
    fontFamily: Platform.select({ web: Fonts.sans, default: 'Inter_500Medium' }),
    fontSize: 13,
    lineHeight: 18,
    fontWeight: Platform.OS === 'web' ? '500' : undefined,
  },
};
