import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

type AppColorScheme = 'light' | 'dark';

interface ThemePreferenceContextValue {
  colorScheme: AppColorScheme;
  toggleTheme: () => void;
}

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

export function ThemePreferenceProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useNativeColorScheme() ?? 'light';
  const [selectedColorScheme, setSelectedColorScheme] = useState<AppColorScheme | null>(null);
  const colorScheme = selectedColorScheme ?? systemColorScheme;

  const toggleTheme = useCallback(() => {
    setSelectedColorScheme((currentSelection) => {
      const currentColorScheme = currentSelection ?? systemColorScheme;

      return currentColorScheme === 'dark' ? 'light' : 'dark';
    });
  }, [systemColorScheme]);

  const value = useMemo(
    () => ({
      colorScheme,
      toggleTheme,
    }),
    [colorScheme, toggleTheme]
  );

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>;
}

export function usePreferredColorScheme() {
  return useContext(ThemePreferenceContext)?.colorScheme;
}

export function useThemeToggle() {
  const context = useContext(ThemePreferenceContext);

  if (!context) {
    throw new Error('useThemeToggle must be used within ThemePreferenceProvider');
  }

  return context.toggleTheme;
}
