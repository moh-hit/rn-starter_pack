import React from 'react'
import {
  AppRegistry,
  LogBox,
} from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { useReduxDevToolsExtension } from '@react-navigation/devtools'

import App from './App'

import { name as appId } from './app.json'
import { navigationRef, isReadyRef } from './src/utils/navigationUtils'

import store from './src/store'
import ThemeProvider from './src/Theme/ThemeProvider'


// const store = configureStore()

AppRegistry.registerComponent(appId, () => AppContainer)

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    if(!__DEV__) {
      errorHandler(error, true)
    } else {
      console.log(error)
    }
  }

  render() {
    return this.props.children
  }
}

const AppContainer = () => {
  useReduxDevToolsExtension(navigationRef)
  React.useEffect(() => {
    return () => { isReadyRef.current = false }
  }, [])
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              isReadyRef.current = true
            }}
          >
            <App />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  )
}

LogBox.ignoreLogs([
  'Require cycle',
])
