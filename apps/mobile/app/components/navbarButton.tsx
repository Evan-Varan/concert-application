import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

interface NavbarButtonProps {
  buttonText: string
  iconName: keyof typeof Ionicons.glyphMap
}

export default function NavbarButton({ buttonText, iconName }: NavbarButtonProps) {
  return (
    <Pressable className="flex flex-col items-center gap-2 rounded-xl bg-black px-3 py-2">
      <Ionicons name={iconName} size={20} color="white" />
      <Text className="text-white">{buttonText}</Text>
    </Pressable>
  )
}