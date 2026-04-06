import { Text, View } from 'react-native'
import Navbar from '../components/navbar'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <View className="flex-[10] px-6 py-4">
          <Text>Main content</Text>
        </View>

        <View className="flex-[1] border-t border-zinc-200 px-6 py-4 items-center">
          <Navbar/>
        </View>
      </View>
    </View>
  )
}
