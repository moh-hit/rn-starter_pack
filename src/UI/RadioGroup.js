import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import CustomText from './CustomText'
import Icon from './Icon'

import { COLORS, DIMENSIONS, ICONS, normalize, SPACING } from '../Theme'

const RadioGroup = (props) => {
  const {
    selected,
    onChange,
    disabled = [],
    labels = [],
    styles: extraStyles,
    labelStyles = {},
    type = 'SELL',
    labelColor = COLORS.TEXT,
    isDark,
  } = props
  const onClick = (label) => {
    if (!disabled.some(itm => itm === label)) onChange(label)
  }
  const linkColor = isDark ? 'BLUE_300' : 'BLUE'
  const themedTextColor = isDark ? 'WHITE' : 'TEXT'
  const disabledIconColor = COLORS.GREEN
  return (
    <View style={[styles.container, extraStyles]}>
      {
        labels.map((label) => {
          const labelSelected = label.id === selected
          const isDisabled = disabled.some(itm => itm === label.id)
          const selectableOpacity = isDisabled ? 1 : 0.6
          const name = labelSelected ? 'RADIO_SELECTED' : 'RADIO_UNSELECTED'
          const labelTextColor = labelSelected ? labelColor : COLORS[themedTextColor]
          const textColor = isDisabled ? COLORS.GREY_100 : labelTextColor
          const iconColor = labelSelected ? disabledIconColor : COLORS[themedTextColor]
          return (
            <TouchableOpacity
              onPress={() => onClick(label.id)}
              activeOpacity={selectableOpacity}
              key={label.id}
            >
              <View style={styles.radioButton}>
                <Icon name={ICONS[name]} size={18} color={iconColor} style={{marginTop: 6}} />
                <View style={{width: DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL*3, marginLeft: normalize(10)}}>
                <CustomText style={[styles.labelText, { color: textColor }, labelStyles]}>{label.title}</CustomText>
                <CustomText size='small' color={COLORS.GREY_200} style={[styles.labelTextDesc]}>{label.desc}</CustomText>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: DIMENSIONS.SPACE_HORIZONTAL
  },
  radioButton: {
    flexDirection: 'row',
    marginVertical: SPACING.SPACE_16,
  },
  labelText: {
    fontWeight: 'bold',
  },
  labelTextDesc: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    textAlign: 'left'
  }
})

export default RadioGroup