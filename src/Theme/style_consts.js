import { Dimensions, Platform } from 'react-native'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// These units belong to `Xiaomi Redmi Note 5 Pro`. The scale can be
// of any device and other devices will scale accordingly.
// Example: If the height of any device is less than the base unit (in this case base unit is width of RN5 pro),
// then all the UI elements should also have smaller width and height with scale factor `actual_device_unit / base_unit`.

// const BASE_PIXEL_RATIO = 2.75
// const BASE_UNIT_HEIGHT = 738.1818181818181
const BASE_UNIT_WIDTH = 392.72727272727275

// To normalize the size, width is used. Height, PixelRatio or combination of height/width/pixelRatio can
// also be used, since width change less frequently across devices hence base unit is width here.
export const normalize = value => parseFloat(((value / BASE_UNIT_WIDTH) * windowWidth).toFixed(4))

export const COLORS = {
  UNDERLAY: '#fbfbfb',
  SCREEN_BG: '#fafafa',
  BORDER_COLOR: '#D5D5D5',
  BACKDROP: '#636363',
  SHADOW_BLUE: '#f3f9ff', // e0e0ff
  SHADOW_GREY: '#eaeaea', // '#e7e7e7' '#dee3ff',
  SHADOW_GREY_LIGHT: '#F3F3F3',
  SHADOW_GREY_LIGHTER: '#F6F6F6',
  INPUT_BORDER: '#D5D5D5',
  
  TEXT: '#000',
  WHITE: '#FFF',

  BLACK: '#000',
  BLACK_30: '#4d4d4d',
  BLACK_60: '#999999',
  BLACK_80: '#cccccc',
  BLACK_100: '#2B2B2B', // dark inputbg
  BLACK_200: '#161616',

  GREY: '#f9f9f9',
  GREY_000: 'rgba(255,255,255,0.9)',
  GREY_100: '#ABABAB',
  GREY_200: '#666666',
  GREY_300: '#303030',
  GREY_400: '#6B6B6B',
  GREY_500: '#5B5B5B', // light input bg
  GREY_600: '#676767', // use when dark input bg
  GREY_700: '#8C8C8C', // use when lighter input bg

  // #F6F6F6

  BLUE: '#0001FC',
  BLUE_000: '#EEEEFF',
  BLUE_100: '#E1E1FB',
  BLUE_200: '#8E96ED',
  BLUE_300: '#3E72FF',
  BLUE_400: '#140DFA',
  BLUE_500: '#E3F3EF',
  BLUE_DARK: '#0000fa',
  // BLUE_400: '#4400EF',
  // BLUE: '#2626B8'

  NAVY: '#3D5493',

  ORANGE: '#FF892E',
  ORANGE_000: '#f9f7f7',
  ORANGE_001: '#FDF3EA',
  ORANGE_100: '#FFDBC0',
  ORANGE_150: '#FFA1A1',
  ORANGE_200: '#FFB881',
  ORANGE_300: '#FD892E',
  ORANGE_400: '#3E3025',

  GREEN: '#0EC213',
  GREEN_100: '#B6EDB7',
  GREEN_200: '#6EDA71',
  GREEN_300: '#449444',
  GREEN_DARK: '#39B43D',
  GREEN_LIGHT: '#E4FFE4',

  RED: '#FF4143',
  RED_100: '#FFE4E8',
  RED_200: '#FFAEBA',
  RED_300: '#FF667D',
  RED_400: '#BA4E5D',

  PURPLE: '#882EFF',
  PURPLE_100: '#F0E5FF',
  PURPLE_200: '#32325A',

  PARAMETERS: '#6732FB',
  POSITION: '#00BDC4',
  DEPLOYED: '#8700FD',

  ORDERLOG_PROGRESS_BAR: '#FFC88A',
  YOUTUBE_RED: '#FF0000',
  KITE_ORANGE: '#F6461A',
  AB_BLUE: '#1D65AB',
  GOLDEN: '#FEC301',
  INFOCARD_BG: '#F2F2F2',
  CATEGORY_BLUE: '#0001FC',
  CATEGORY_GREEN: '#3DBC00',
  CATEGORY_VOILET: '',
  CATEGORY_YELLOW: '#FF892E',
}

export const LIGHT = {

  // general colors
  bgPrimary: COLORS.WHITE,
  bgSecondary: COLORS.WHITE,
  bgTertiary: COLORS.WHITE,
  screenBg: COLORS.SCREEN_BG,

  btnPrimary: COLORS.BLUE,
  btnSecondary: '',
  btnDisabled: COLORS.GREY_100,

  textPrimary: COLORS.BLACK,
  textSecondary: COLORS.BLACK,
  textTertiary: COLORS.BLACK,

  backdrop: COLORS.BACKDROP,
  borderColor: COLORS.BORDER_COLOR,

  // context specific colors
  inputDarkBg: COLORS.WHITE,
  placeholderDarkColor: COLORS.GREY_100,
  inputLightBg: COLORS.WHITE,
  placeholderLightColor: COLORS.GREY_100,
  inputFocusBorderColor: COLORS.BLUE,

  progress25: COLORS.RED_300,
  progress50: COLORS.BLUE_400,
  progress75: COLORS.GREEN,
  underlay: COLORS.UNDERLAY,
  linkColor: COLORS.BLUE,
  switchTrack: {
    false: COLORS.BORDER_COLOR,
    true: COLORS.BLUE_100,
  },
  switchThumb: COLORS.BLUE,
  disabled: COLORS.GREY_100,
  // for reference
  // bullish: COLORS.RED,
  // neutral: COLORS.GREY_100,
  // bearish: COLORS.GREEN,
}

export const DARK = {

  // general colors
  bgPrimary: COLORS.BLACK,
  bgSecondary: COLORS.BLACK_100, // 1f1f1f
  bgTertiary: COLORS.BLACK_200,
  screenBg: COLORS.BLACK,

  btnPrimary: COLORS.BLUE_DARK,
  btnSecondary: COLORS.BLUE_300,
  btnDisabled: COLORS.GREY_100,

  textPrimary: COLORS.WHITE,
  textSecondary: COLORS.BLACK_60,
  textTertiary: COLORS.BLACK_80,

  backdrop: COLORS.BACKDROP,
  borderColor: COLORS.GREY_300,

  // context specific colors
  inputDarkBg: COLORS.BLACK_100,
  placeholderDarkColor: COLORS.GREY_600,
  inputLightBg: COLORS.GREY_500,
  placeholderLightColor: COLORS.GREY_700,
  inputFocusBorderColor: COLORS.BLUE_300,

  disabled: COLORS.GREY_100,
  progress25: COLORS.RED_300,
  progress50: COLORS.BLUE,
  progress75: COLORS.ORANGE,
  underlay: COLORS.BLACK_200,
  linkColor: COLORS.BLUE_300,
  switchTrack: {
    false: COLORS.BLACK_100,
    true: COLORS.BLUE,
  },
  switchThumb: COLORS.WHITE,
  // for reference
  // bullish: COLORS.RED_400,
  // neutral: COLORS.GREY_400,
  // bearish: COLORS.GREEN_300,
}

export const FONTS = {
  TINY_1: normalize(9),
  TINY: normalize(11),
  SMALL: normalize(13),
  SMALL_1: normalize(14),
  REGULAR: normalize(15),
  MEDIUM: normalize(17),
  MEDIUM_1: normalize(20),
  LARGE: normalize(22),
  LARGE_1: normalize(24),
  LARGE_2: normalize(28),
  LARGE_3: normalize(30),
  LARGE_4: normalize(32),
  LARGE_5: normalize(34),
  XLARGE: normalize(36),
}

export const SPACING = {
  SPACE_2: normalize(2),
  SPACE_4: normalize(4),
  SPACE_5: normalize(5),
  SPACE_6: normalize(6),
  SPACE_8: normalize(8),
  SPACE_10: normalize(10),
  SPACE_11: normalize(11),
  SPACE_12: normalize(12),
  SPACE_14: normalize(14),
  SPACE_16: normalize(16),
  SPACE_18: normalize(18),
  SPACE_20: normalize(20),
  SPACE_22: normalize(22),
  SPACE_24: normalize(24),
  SPACE_28: normalize(28),
  SPACE_32: normalize(32),
  SPACE_36: normalize(36),
  SPACE_38: normalize(38),
  SPACE_40: normalize(40),
  SPACE_48: normalize(48),
  SPACE_54: normalize(54),
  SPACE_64: normalize(64),
  SPACE_68: normalize(68),
  SPACE_96: normalize(96),
}

export const FONTFAMILY = {
  REGULAR: 'Poppins-Regular',
  SEMI_BOLD: 'Poppins-SemiBold',
  MEDIUM: 'Poppins-Medium',
}

export const DIMENSIONS = {
  HEIGHT: windowHeight,
  WIDTH: windowWidth,
  SPACE_VERTICAL: SPACING.SPACE_20,
  SPACE_HORIZONTAL: SPACING.SPACE_24,
  HEADER_SEPERATOR: SPACING.SPACE_14,
  ROW_SEPERATOR: SPACING.SPACE_20,
  SECTION_SEPERATOR: SPACING.SPACE_24,
  INPUT_VERTICAL: SPACING.SPACE_12,
  HEADER_HEIGHT: SPACING.SPACE_64,
}

export const DEFAULTS = {
  ACTIVE_BTN: (color = COLORS.BLUE) => ({
    color: COLORS.WHITE,
    backgroundColor: color,
    borderRadius: 6,
    borderWidth: 0,
    borderColor: color,
    paddingVertical: SPACING.SPACE_10,
    textAlign: 'center',
    fontSize: FONTS.MEDIUM,
    fontFamily: FONTFAMILY.MEDIUM,
    alignItems: 'center',
  }),
  BORDER_BTN: (color = COLORS.BLUE, borderWidth = 1) => ({
    color,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    borderWidth,
    borderColor: color,
    paddingVertical: SPACING.SPACE_10,
    textAlign: 'center',
    fontSize: FONTS.MEDIUM,
    fontFamily: FONTFAMILY.MEDIUM,
    alignItems: 'center',
  }),
  DISABLED_BTN: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.GREY_100,
    borderRadius: 6,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingVertical: SPACING.SPACE_10,
    textAlign: 'center',
    fontSize: FONTS.MEDIUM,
    fontFamily: FONTFAMILY.MEDIUM,
    alignItems: 'center',
  },
  LINK_BTN: (color = COLORS.BLUE) => ({
    color,
    fontFamily: FONTFAMILY.MEDIUM,
  }),
  SHADOW_BLUE: {
    color: COLORS.SHADOW_BLUE,
    border: 14,
    radius: 18,
    x: 0,
    y: 5,
  },
  SHADOW_GREY: {
    color: COLORS.SHADOW_GREY_LIGHTER,
    border: 12,
    radius: 15,
    x: 0,
    y: 2,
  },
}

export const shadowGenerator = ({
  elevation = 1,
  shadowColor = '#000',
  shadowOffset = {
    width: 0,
    height: 1,
  },
  shadowOpacity = 0.1,
  shadowRadius = 8,
}) => {
  return Platform.select({
    ios: SHADOW[elevation] ? {
      ...SHADOW[elevation],
      shadowColor,
    } : {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    },
    android: { elevation },
  })
}

// For more refer https://ethercreative.github.io/react-native-shadow-generator/
export const SHADOW = {
  10: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  12: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

  },
  14: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  18: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  25: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
}