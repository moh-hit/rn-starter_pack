import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import {
  COLORS, FONTS,
} from '../Theme'
import { useTheme } from '../Theme/ThemeProvider'

const CustomText = ({
  style,
  color,
  weight,
  size,
  children,
  center,
  flex,
  extraProps,
}) => {
  const { theme } = useTheme()
  let extraStyles = {}
  if (center) {
    extraStyles = {
      textAlign: 'center',
      alignSelf: 'center',
      textAlignVertical: 'center',
    }
  }
  if (flex) {
    extraStyles = {
      ...extraStyles,
      flex,
    }
  }
  const styles = {
    fontSize: FONTS[size.toUpperCase()],
    ...extraStyles,
    textAlignVertical: 'center',
    color: size === 'small' ? COLORS.GREY_200 : COLORS[color?.toUpperCase()] || color || theme.textPrimary,
    paddingVertical: FONTS[size.toUpperCase()] * 0.58,
    fontWeight: weight
  }
  return (
    <Text
      style={[styles, style]}
      {...extraProps}
    >
      {children}
    </Text>
  )
}

CustomText.defaultProps = {
  weight: 'normal',
  size: 'regular',
  style: {},
  color: '',
  extraProps: {},
  center: false,
  flex: 0,
}

CustomText.propTypes = {
  weight: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  extraProps: PropTypes.object,
  center: PropTypes.bool,
  flex: PropTypes.number,
}

export default CustomText