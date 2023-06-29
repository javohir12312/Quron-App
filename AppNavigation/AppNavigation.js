import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import Quran from "../components/Quran/Quran"
import Home from "../components/Home/Home"
import PrayTime from "../components/PrayTime/PrayTime"
import Tasbeeh from "../components/Tasbeeh/Tasbeeh"
import Bookmarks from "../components/Bookmarks/Bookmarks"
import LastRead from "../components/LastRead/LastRead"
import Sura from '../components/Sura/Sura'


export default AppNavigation = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='LastRead' name="LastRead" component={LastRead} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='Quran' name="Quran" component={Quran} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='PrayTime' name="PrayTime" component={PrayTime} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='Tasbeeh' name="Tasbeeh" component={Tasbeeh} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='Bookmarks' name="Bookmarks" component={Bookmarks} options={{ headerShown: false }} />
      <Stack.Screen navigationKey='Sura' name="Sura" component={Sura} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

