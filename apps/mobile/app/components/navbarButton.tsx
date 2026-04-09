import { Ionicons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"

import { useThemeColor } from "@/hooks/use-theme-color"

interface NavbarButtonProps {
  buttonText: string
  iconName: keyof typeof Ionicons.glyphMap
  onClick: () => void;
  isActive: boolean;
}

export default function NavbarButton({ buttonText, iconName, onClick, isActive }: NavbarButtonProps) {
  const iconColor = useThemeColor({}, isActive ? "tabIconSelected" : "tabIconDefault");

  return (
    <Pressable onPress = {onClick} className="flex flex-col items-center gap-2 px-3">
      <View className={`h-[2px] w-full ${isActive ? "bg-app-primary" : "bg-app-bg-elevated"}`} />
      <Ionicons name={iconName} size={25} color={iconColor} />
      <Text className={`${isActive ? "text-app-primary" : "text-app-text"}`}>{buttonText}</Text>
    </Pressable>
  )
}
