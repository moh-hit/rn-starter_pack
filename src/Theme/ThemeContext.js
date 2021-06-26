import React from 'react'
import { THEME_TYPE_MAP } from '../utils/consts'

const ThemeContext = React.createContext({
  themeMode: THEME_TYPE_MAP.LIGHT.value,
  themes: {},
  toggleTheme: () => {},
})

export default ThemeContext