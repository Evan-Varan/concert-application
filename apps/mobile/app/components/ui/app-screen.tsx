import { ReactNode } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppScreenProps extends ViewProps {
  children: ReactNode;
  scrollable?: boolean;
}

export default function AppScreen({
  children,
  className = '',
  scrollable = false,
  ...props
}: AppScreenProps) {
  const insets = useSafeAreaInsets();
  const containerClassName = `flex-1 bg-app-bg ${className}`.trim();
  const contentPaddingTop = insets.top + 16;

  if (scrollable) {
    return (
      <View className={containerClassName}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: contentPaddingTop,
            paddingBottom: 112,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">{children}</View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className={containerClassName} {...props}>
      <View
        className="flex-1 px-6 pb-28"
        style={{
          paddingTop: contentPaddingTop,
        }}
      >
        {children}
      </View>
    </View>
  );
}
