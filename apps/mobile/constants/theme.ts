import { Platform } from 'react-native';

export const AppTheme = {
  light: {
    bg: '#fafafa',
    bgElevated: '#ffffff',
    surface: '#f2f2f2',
    surfaceHover: '#eaeaea',
    border: '#e0e0e0',
    text: '#111111',
    textMuted: '#5f5f5f',
    primary: '#4caf50',
    primaryHover: '#439a47',
    primarySoft: '#a5d6a7',
    accent: '#4caf50',
    danger: '#d32f2f',
    success: '#2e7d32',
  },
  dark: {
    bg: '#111111',
    bgElevated: '#181818',
    surface: '#1f1f1f',
    surfaceHover: '#2a2a2a',
    border: '#2f2f2f',
    text: '#fafafa',
    textMuted: '#b3b3b3',
    primary: '#4caf50',
    primaryHover: '#66bb6a',
    primarySoft: '#244226',
    accent: '#a5d6a7',
    danger: '#ef5350',
    success: '#66bb6a',
  },
} as const;

export const Colors = {
  light: {
    text: AppTheme.light.text,
    background: AppTheme.light.bg,
    tint: AppTheme.light.primary,
    icon: AppTheme.light.textMuted,
    tabIconDefault: AppTheme.light.textMuted,
    tabIconSelected: AppTheme.light.primary,
  },
  dark: {
    text: AppTheme.dark.text,
    background: AppTheme.dark.bg,
    tint: AppTheme.dark.primary,
    icon: AppTheme.dark.textMuted,
    tabIconDefault: AppTheme.dark.textMuted,
    tabIconSelected: AppTheme.dark.primary,
  },
} as const;

export const ThemeVariables = {
  light: {
    '--bg': AppTheme.light.bg,
    '--bg-elevated': AppTheme.light.bgElevated,
    '--surface': AppTheme.light.surface,
    '--surface-hover': AppTheme.light.surfaceHover,
    '--border': AppTheme.light.border,
    '--text': AppTheme.light.text,
    '--text-muted': AppTheme.light.textMuted,
    '--primary': AppTheme.light.primary,
    '--primary-hover': AppTheme.light.primaryHover,
    '--primary-soft': AppTheme.light.primarySoft,
    '--accent': AppTheme.light.accent,
    '--danger': AppTheme.light.danger,
    '--success': AppTheme.light.success,
  },
  dark: {
    '--bg': AppTheme.dark.bg,
    '--bg-elevated': AppTheme.dark.bgElevated,
    '--surface': AppTheme.dark.surface,
    '--surface-hover': AppTheme.dark.surfaceHover,
    '--border': AppTheme.dark.border,
    '--text': AppTheme.dark.text,
    '--text-muted': AppTheme.dark.textMuted,
    '--primary': AppTheme.dark.primary,
    '--primary-hover': AppTheme.dark.primaryHover,
    '--primary-soft': AppTheme.dark.primarySoft,
    '--accent': AppTheme.dark.accent,
    '--danger': AppTheme.dark.danger,
    '--success': AppTheme.dark.success,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
