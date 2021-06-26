import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, DIMENSIONS, normalize, SPACING } from '../../Theme'
import CustomInput from '../../UI/CustomInput'
import CustomText from '../../UI/CustomText'
import Button from '../../UI/Button'
import { withTheme } from '../../Theme/ThemeProvider'

const screenHeight = DIMENSIONS.HEIGHT / 100

function Auth(props) {
  const { styles } = props
  return (
    <View style={styles.container}>
      <View>
        <CustomText weight="bold" size="xlarge">RN Starter Kit</CustomText>
        <CustomText weight="bold" size="medium_1">What it has</CustomText>
        <CustomText weight="normal" size="regular"> - Automatic Theming {'\n'} - Basic Customized Component {'\n'} - Get started Redux Setup{'\n'} - React Navigation Setup{'\n'} - Predefined Font size, Spacings, Material colors and more
        </CustomText>
        <CustomText weight="bold" size="medium_1">Major Packages included</CustomText>
        <CustomText weight="normal" size="regular">@react-navigation {'\n'}react-native-vector-icons {'\n'}react-redux (with thunk)
        </CustomText>
      </View>
      <View>
        <CustomText weight="bold" size="xlarge">Get Started</CustomText>
        <CustomText size="small">Enter your mobile number</CustomText>
        <CustomInput placeholder="Mobile Number" containerStyles={styles.mobileInputContainer} inputStyles={styles.mobileInput} />
        <Button mode="contained" roundness={8} containerStyle={styles.buttonContainer} labelStyle={{ fontWeight: "bold" }}>Send OTP</Button>
        <CustomText
          size="small"
          weight="normal"
          style={{
            marginTop: screenHeight * 3,
          }}
        >
          By continuing you agree to our{' '}
          <CustomText
            size="small"
            weight="bold"
            style={{ textDecorationLine: 'underline' }}
          >Terms and Conditions</CustomText>
        </CustomText>
      </View>
    </View>
  )
}

const stylesheet = (theme, isDark) => StyleSheet.create({
  container: {
    backgroundColor: theme.bgPrimary,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    paddingVertical: DIMENSIONS.SPACE_VERTICAL
  },
  mobileInput: {
    borderWidth: 0.5,
    borderColor: COLORS.INPUT_BORDER,
    height: normalize(50)
  },
  mobileInputContainer: {
    marginVertical: DIMENSIONS.SPACE_VERTICAL
  },
  buttonContainer: {
    height: normalize(50)
  }
})

export default withTheme(stylesheet)(Auth);
