import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

interface NavbarButtonProps {
  buttonText: string
  iconName: keyof typeof Ionicons.glyphMap
  onClick: () => void;
  activeButton : string;
}

export default function NavbarButton({ buttonText, iconName, onClick, activeButton }: NavbarButtonProps) {

  

  return (
    
    <Pressable  onPress = {onClick} className="flex flex-col items-center gap-2 px-3">
      {activeButton === buttonText ?
      <View className="h-[2px] bg-green-300 w-full" />
      :
      <View className="h-[2px] bg-white w-full" />
      }
      <Ionicons name={iconName} size={25} color={activeButton === buttonText ? "green" : "black"} />
      <Text className="text-black">{buttonText}</Text>
    </Pressable>
  )
}