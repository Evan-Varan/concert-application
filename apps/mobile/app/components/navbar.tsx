import NavbarButton from "./navbarButton"
import { View } from "react-native"
import { usePathname, useRouter } from "expo-router"

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View className="flex flex-row">
      <NavbarButton buttonText="Home" iconName="home-outline" onClick = {() => router.push("/")} isActive = {pathname === "/"} />
      <NavbarButton buttonText="Discover" iconName="search-outline" onClick = {() => router.push("/discover")} isActive = {pathname === "/discover"} />
      <NavbarButton buttonText="Tickets" iconName="ticket-outline" onClick = {() => {}} isActive = {false} />
      <NavbarButton buttonText="Groups" iconName="chatbubble-outline" onClick = {() => {}} isActive = {false} />
      <NavbarButton buttonText="Profile" iconName="person-outline" onClick = {() => {}} isActive = {false} />
    </View>
  )
}
