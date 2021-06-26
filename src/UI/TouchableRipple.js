import * as React from 'react'
import {
  Platform, TouchableOpacity, TouchableNativeFeedback, View,
} from 'react-native'
import PropTypes from 'prop-types'

// Constants
import { COLORS, SPACING } from '../Theme/style_consts'

const ANDROID_VERSION_LOLLIPOP = 21
const ANDROID_VERSION_PIE = 28

const RIPPLE_SUPPORTED = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP

/* HOW TO USE
You can wrap any component with this component to get a ripple on Android.
In iOS it's a plain TouchableOpacity
borderless: if true then ripple is shown outside view bounds
underlayColor:
*/

/**
 * @augments {Component<Props, State>}
 */

class TouchableRipple extends React.Component {
  render() {
    const {
      style,
      contentStyle,
      background,
      borderless,
      overflow,
      disabled: disabledProp,
      rippleColor,
      underlayColor,
      children,
      disableRipple,
      ...otherProps
    } = this.props

    const disabled = disabledProp || !this.props.onPress
    const calculatedRippleColor = rippleColor || COLORS.SHADOW_GREY

    // A workaround for ripple on Android P is to use useForeground + overflow: 'hidden'
    // https://github.com/facebook/react-native/issues/6480
    const useForeground = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE && borderless

    let overflowStyle = {}
    if(!overflow) {
      overflowStyle = { overflow: 'hidden', borderWidth: 0.00000001, borderColor: 'transparent' }
    }

    if (RIPPLE_SUPPORTED && !disableRipple) {
      return (
      // <View style={[borderless && overflowStyle, style]}>
        <View style={[overflowStyle, style]}>
          <TouchableNativeFeedback
            disabled={disabled}
            useForeground={useForeground}
            background={
              background != null
                ? background
                // : TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless)
                // instead of just using borderless, using this condition below to render ripple properly on all devices
                : TouchableNativeFeedback.Ripple(calculatedRippleColor, borderless || !(Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_PIE))
            }
            {...otherProps}
          >
            {React.Children.only(children)}
          </TouchableNativeFeedback>
        </View>
      )
    }

    return (
      <TouchableOpacity
        hitSlop={{
          top: SPACING.SPACE_4, bottom: SPACING.SPACE_4, left: SPACING.SPACE_4, right: SPACING.SPACE_4,
        }}
        {...otherProps}
        disabled={disabled}
        activeOpacity={0.6}
        style={[style]}
      >
        {React.Children.only(children)}
      </TouchableOpacity>
    )
  }
}

TouchableRipple.defaultProps = {
  borderless: false,
  overflow: false,
  style: {},
  background: null,
  disabled: false,
  rippleColor: null,
  underlayColor: null,
  onPress: undefined,
  // children,
  // ...otherProps
}

TouchableRipple.propTypes = {
  borderless: PropTypes.bool,
  overflow: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  background: PropTypes.string,
  disabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  underlayColor: PropTypes.string,
  onPress: PropTypes.func,
  // children,
}

export default TouchableRipple