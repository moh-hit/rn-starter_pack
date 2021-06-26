import React, { useState } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import {
  COLORS, FONTS, SPACING, DIMENSIONS,
} from '../Theme'
import { useTheme } from '../Theme/ThemeProvider'

const CustomInput = React.memo(({
  placeholder,
  value,
  iconName,
  iconStyle,
  iconContainerStyle,
  inputStyles,
  containerStyles,
  editable,
  underlineColorAndroid,
  onSubmitEditing,
  textInputRef,
  inputError,
  onChangeText,
  inputProps,
  inputKey,
  inputRegx,
  onFocus,
  onBlur,
  maxLength,
  disabledContainerStyles,
}) => {
  const { styles, theme, isDark } = useTheme(stylesheet)
  const [isFocused, toggleFocus] = useState(!!inputProps.autoFocus)
  const onInputChange = (inputValue) => {
    let passedRegexTest = true
    if (inputRegx) {
      passedRegexTest = new RegExp(inputRegx).test(inputValue)
    }
    if (inputValue && inputRegx && !passedRegexTest) {
      return
    }
    onChangeText(inputValue, inputKey)
  }
  let borderStyle = isFocused ? { borderColor: theme.inputFocusBorderColor } : null
  borderStyle = inputError ? { borderColor: COLORS.RED } : borderStyle
  const disabledStyles = editable ? { } : disabledContainerStyles
  return (
    <View style={[styles.container, containerStyles, disabledStyles, borderStyle]}>
      <TextInput
        ref={textInputRef}
        onFocus={() => { if (onFocus && editable) onFocus(); toggleFocus(true) }}
        onBlur={() => { if (onBlur) onBlur(); toggleFocus(false) }}
        placeholder={placeholder}
        placeholderTextColor={isDark ? COLORS.BLACK_30 : COLORS.GREY_100}
        underlineColorAndroid={underlineColorAndroid || 'transparent'}
        value={value && value.toString()}
        onChangeText={onInputChange}
        style={[styles.input, inputStyles]}
        maxLength={maxLength}
        editable={editable}
        onSubmitEditing={onSubmitEditing}
        {...inputProps}
      />
      {/* {textContentType === 'password' && value ? (
        <TouchableHighlight
          style={styles.showPasswordBtn}
          underlayColor={COLORS.white}
          onPress={() => this.changeHandler('hideValue', !hideValue)}
        >
          <Icon
            name={ICONS.WATCH}
            size={14}
            color={hideValue ? COLORS.black : COLORS.BLUE}
          />
        </TouchableHighlight>
      ) : null} */}
    </View>
  )
})

const stylesheet = (theme, isDark) => StyleSheet.create({
  container: {
    backgroundColor: theme.bgTertiary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  iconStyle: {
    marginRight: SPACING.SPACE_8,
  },

  input: {
    // height: 45,
    paddingVertical: DIMENSIONS.INPUT_VERTICAL,
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    flex: 1,
    padding: 0,
    margin: 0,
    textAlignVertical: 'center',
    color: theme.textPrimary,
    fontSize: FONTS.REGULAR,
    borderRadius: 8,
  },
})

export default React.forwardRef((props, ref) => (
  <CustomInput textInputRef={ref} {...props} />
))

CustomInput.defaultProps = {
  placeholder: '',
  iconName: null,
  iconStyle: {},
  inputStyles: {},
  containerStyles: {},
  editable: true,
  onSubmitEditing: () => null,
  textInputRef: null,
  inputError: false,
  onChangeText: () => null,
  inputProps: {},
  inputKey: '',
  // inputRegx: '',
  onFocus: null,
  onBlur: null,
  maxLength: 40,
  disabledContainerStyles: {},
}

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  iconName: PropTypes.string,
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabledContainerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  textInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  inputError: PropTypes.bool,
  onChangeText: PropTypes.func,
  inputProps: PropTypes.object,
  inputKey: PropTypes.string,
  // inputRegx: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
}