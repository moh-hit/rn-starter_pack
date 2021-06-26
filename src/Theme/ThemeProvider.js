import React, {
    useContext, useMemo, useState, useEffect,
  } from 'react'
  
  import ThemeContext from './ThemeContext'
  
  import { LIGHT, DARK } from './style_consts'
  import { THEME_TYPE_MAP } from '../utils/consts'
  
  const darkThemeTime = {
    start: '18:00', // in hours,
    end: '06:00',
  }
  
  let timer = null
  
  const ThemeProvider = (props) => {
    const [themeMode, setThemeMode] = useState(THEME_TYPE_MAP.LIGHT.value)
    const [isDark, setIsDark] = useState(themeMode === THEME_TYPE_MAP.DARK.value)
  
    const toggleTheme = (updatedMode) => {
      if (!Object.keys(THEME_TYPE_MAP).includes(updatedMode)) {
        return
      }
      if (timer) clearTimeout(timer)
      setThemeMode(updatedMode)
    }
    const startThemeTimer = () => {
      if (themeMode === THEME_TYPE_MAP.AUTO.value) {
        if (timer) {
          clearTimeout(timer)
        }
        const hr = new Date().getHours()
        const min = new Date().getMinutes()
        let setAfterTime = 0 // seconds
        let remainingHrs = 0
        let remainingMin = 0
        let setToDark = false
        const endHr = parseInt(darkThemeTime.end.split(':')[0], 10)
        const endMin = parseInt(darkThemeTime.end.split(':')[1], 10)
        const startHr = parseInt(darkThemeTime.start.split(':')[0], 10)
        const startMin = parseInt(darkThemeTime.start.split(':')[1], 10)
        let isCurrentDark = false
        if (endHr === startHr) {
          if (startMin >= min) {
            remainingHrs = 0
            setToDark = startMin !== min
            isCurrentDark = startMin === min
            remainingMin = startMin === min ? endMin - min : startMin - min
          } else if (startMin < min && endMin > min) {
            remainingHrs = 0
            setToDark = false
            isCurrentDark = true
            remainingMin = endMin - min
          } else {
            remainingHrs = 24
            setToDark = endMin === min
            remainingMin = 60 - min
          }
        } else if (hr === startHr) {
          if (startMin >= min) {
            remainingHrs = 0
            remainingMin = startMin === min ? endMin - min : startMin - min
            setToDark = startMin !== min
            isCurrentDark = startMin === min
          } else if (startHr > endHr) {
            remainingHrs = hr <= endHr ? endHr - hr : 24 - hr
            remainingMin = 60 - min
            isCurrentDark = true
          } else {
            remainingHrs = endHr - hr
            remainingMin = 60 - min
            isCurrentDark = true
          }
        } else if (hr === endHr) {
          if (endMin < min) {
            setToDark = true
            remainingMin = (60 - min) + startMin
            if (endHr > startHr) {
              remainingHrs = hr <= startHr ? startHr - hr : 24 - hr
            } else {
              remainingHrs = startHr - hr
            }
          } else if (endMin >= min) {
            isCurrentDark = true
            remainingHrs = 0
            remainingMin = endMin - min
          }
        } else if ((hr > startHr || hr < endHr)) {
          if (startHr >= endHr) {
            remainingHrs = hr < endHr ? endHr - hr : 24 - hr
            setToDark = startHr === endHr
            isCurrentDark = true
          } else if (hr > endHr) {
            remainingHrs = 24 - hr
            setToDark = true
          } else {
            remainingHrs = endHr - hr
            isCurrentDark = true
          }
          remainingMin = 60 - min
        }
        if (isCurrentDark && remainingMin !== 0) {
          setIsDark(true)
        }
        // console.log(remainingHrs, remainingMin, hr, min, isCurrentDark, 'lol remina')
        setAfterTime = (remainingHrs * 60 * 60) + (remainingMin * 60)
        // console.log(hr, setAfterTime, setToDark, 'lol time')
        if (setAfterTime > 0 && setAfterTime < 1200) {
          timer = setTimeout(() => {
            setIsDark(setToDark)
          }, setAfterTime * 1000)
        }
      } else {
        setIsDark(themeMode === THEME_TYPE_MAP.DARK.value)
      }
    }
  
    useEffect(() => {
      startThemeTimer()
    }, [themeMode])
    const theme = isDark ? DARK : LIGHT
    return (
      <ThemeContext.Provider
        value={{
          themeMode,
          theme,
          toggleTheme,
          isDark,
          startThemeTimer,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    )
  }
  
  export const useTheme = (stylesheetBuilder = () => {}) => {
    const {
      themeMode, theme, toggleTheme, isDark, startThemeTimer,
    } = useContext(ThemeContext)
    const styles = useMemo(() => stylesheetBuilder(theme, isDark), [isDark])
    return {
      styles, isDark, theme, toggleTheme, themeMode, startThemeTimer,
    }
  }
  
  /*
  Eg:
  const styles = (theme) => ({
    container: { backgroundColor: theme.BG_PRIMARY }
  })
  withTheme(styles)(WrappedComponent)
  */
  export const withTheme = (stylesheetBuilder) => {
    return function (Component) {
      const WithTheme = (props) => {
        const { forwardedRef } = props
        const {
          styles, isDark, theme, toggleTheme, themeMode,
          startThemeTimer,
        } = useTheme(stylesheetBuilder)
        return (
          <Component
            {...props}
            ref={forwardedRef}
            styles={styles}
            isDark={isDark}
            themeMode={themeMode}
            theme={theme}
            toggleTheme={toggleTheme}
            startThemeTimer={startThemeTimer}
          />
        )
      }
  
      WithTheme.displayName = `withTheme(${getDisplayName(Component)})`
      // return WithTheme
      return React.forwardRef((props, ref) => {
        return <WithTheme {...props} forwardedRef={ref} />
      })
    }
  }
  
  function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component'
  }
  
  export default ThemeProvider