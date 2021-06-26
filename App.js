import React, { PureComponent } from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { AuthScreens } from './src/screens'
import { NAVIGATIONS } from './src/utils/navigationConstant'
import { withTheme } from './src/Theme/ThemeProvider'
import { COLORS } from './src/Theme'

const AppView = Platform.select({
  ios: SafeAreaView,
  android: View,
})

const ROUTES = {
  AUTH: 'auth',
}


class App extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      activeRoute : ROUTES.AUTH
    }
  }

  render() {
    const {activeRoute} = this.state
    const { theme, isDark } = this.props
    const appViewStyle = { flex: 1, backgroundColor: theme.bgPrimary }
    const barStyle = isDark ? 'light-content' : 'dark-content'


    if (activeRoute === ROUTES.AUTH) {
      return (
        <AppView style={appViewStyle}>
          <StatusBar backgroundColor={theme.bgPrimary} barStyle={barStyle} />
          {AuthScreens()}
        </AppView>
      )
    }
  }
}

export default withTheme(undefined)(App)
