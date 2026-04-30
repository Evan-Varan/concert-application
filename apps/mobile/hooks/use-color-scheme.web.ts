import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { usePreferredColorScheme } from '@/contexts/theme-preference';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const preferredColorScheme = usePreferredColorScheme();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (preferredColorScheme) {
    return preferredColorScheme;
  }

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
