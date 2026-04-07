import { Text, View } from 'react-native'
import Navbar from '../components/navbar'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-app-bg">
      <View className="flex-1">
        <View className="flex-[10] px-6 py-4">
          <Text className="text-app-text">Home Screen</Text>
        </View>

        <View className="flex-[1] items-center border-t border-app-border bg-app-bg-elevated px-6 py-4">
          <Navbar/>
        </View>
      </View>
    </View>
  )
}
