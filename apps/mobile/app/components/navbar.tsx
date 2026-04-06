import NavbarButton from "./navbarButton"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { View } from "react-native"

export default function Navbar() {

  const[activeButton, setActiveButton] = useState("Home");

  return (
    <View className="flex flex-row">
      <NavbarButton buttonText="Home" iconName="home-outline" onClick = {() => setActiveButton("Home")} activeButton = {activeButton} />
      <NavbarButton buttonText="Discover" iconName="search-outline" onClick = {() => setActiveButton("Discover")} activeButton = {activeButton}/>
      <NavbarButton buttonText="Tickets" iconName="ticket-outline" onClick = {() => setActiveButton("Tickets")} activeButton = {activeButton}/>
      <NavbarButton buttonText="Groups" iconName="chatbubble-outline" onClick = {() => setActiveButton("Groups")} activeButton = {activeButton}/>
      <NavbarButton buttonText="Profile" iconName="person-outline" onClick = {() => setActiveButton("Profile")} activeButton = {activeButton}/>
    </View>
  )
}