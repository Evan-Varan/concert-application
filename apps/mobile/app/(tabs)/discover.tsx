import { Text, View } from "react-native";

import Navbar from "../components/navbar";

export default function DiscoverScreen() {
  return (
    <View className="flex-1 bg-app-bg">
      <View className="flex-1">
        <View className="flex-[10] px-6 py-4">
          <Text className="text-3xl font-semibold text-app-text">Discover</Text>
          <Text className="mt-2 text-app-text-muted">
            This is an Expo Router screen at /discover. Use this file as the template for the rest of your routes.
          </Text>
        </View>

        <View className="flex-[1] items-center border-t border-app-border bg-app-bg-elevated px-6 py-4">
          <Navbar />
        </View>
      </View>
    </View>
  );
}
