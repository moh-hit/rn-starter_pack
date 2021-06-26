import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { enableScreens } from 'react-native-screens'

import { View } from 'react-native'
import { useTheme } from './Theme/ThemeProvider'
import { NAVIGATIONS } from './utils/navigationConstant'

import Auth from './Screens/Auth/Auth-redux'

enableScreens()
const AuthStack = createNativeStackNavigator()

export const AuthScreens = (extraData) => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={NAVIGATIONS.AUTH.name}>
      <AuthStack.Screen name={NAVIGATIONS.AUTH.name} component={Auth} />

    </AuthStack.Navigator>
  )
}