import NavbarButton from "./navbarButton"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"

export default function Navbar() {
  return (
    <View className="flex flex-row gap-4">
      <NavbarButton buttonText="Home" iconName="home-outline" />
      <NavbarButton buttonText="Discover" iconName="search-outline" />
      <NavbarButton buttonText="Tickets" iconName="ticket-outline" />
      <NavbarButton buttonText="Groups" iconName="chatbubble-outline" />
      <NavbarButton buttonText="Profile" iconName="person-outline" />
    </View>
  )
}