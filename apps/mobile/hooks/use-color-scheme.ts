import { useColorScheme as useNativeColorScheme } from 'react-native';

import { usePreferredColorScheme } from '@/contexts/theme-preference';

export function useColorScheme() {
  return usePreferredColorScheme() ?? useNativeColorScheme();
}
