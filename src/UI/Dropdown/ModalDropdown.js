import React, {
    useState, useCallback,
  } from 'react'
  import {
    StyleSheet, View, TouchableHighlight, ScrollView,
  } from 'react-native'
  import PropTypes from 'prop-types'
  
  import CustomText from '../CustomText'
  import Icon from '../Icon'
  import CustomModal from '../CustomModal'
  import Dropdown from './index'
  
  import { withTheme } from '../../Theme/ThemeProvider'
  import {
    ICONS, COLORS, SPACING, DIMENSIONS, shadowGenerator,
  } from '../../Theme'
  
  const renderLabel = (label, optionObj, selected, labelRender, styles, isDark) => {
    if (labelRender) {
      return labelRender(optionObj, label, selected)
    }
    if (optionObj.icon) {
      const {
        icon, iconSize, iconColor, optionSize = 'regular',
      } = optionObj
      let extraStyles = {}
      if (isDark) {
        extraStyles = { paddingHorizontal: SPACING.SPACE_12 }
        if (selected) extraStyles = [styles.selectedOptionLabel, extraStyles]
      }
      const modIconColor = isDark && (!iconColor || iconColor === 'TEXT') ? 'WHITE' : iconColor
      const labelStyle = selected ? { flex: 1 } : {}
      return (
        <View style={[styles.optionLabel, extraStyles]}>
          <Icon name={icon} size={iconSize} color={COLORS[modIconColor]} style={{ width: iconSize }} />
          <CustomText weight="regular" size={optionSize} color={modIconColor} style={[styles.optionLabelText, labelStyle]}>{label}</CustomText>
          {selected && (
            <Icon name={ICONS.TICK_ROUND_FILLED} color={COLORS.BLUE} size={18} style={styles.tickIcon} />
          )}
        </View>
      )
    }
    let textColor = selected ? 'blue' : 'text'
    if (isDark) {
      textColor = selected ? 'blue_300' : 'white'
    }
    return <CustomText style={styles.item} color={textColor}>{label}</CustomText>
  }
  
  const ModalDropdown = React.memo((props) => {
    const {
      containerStyles, inputStyles, position, dropDownIcon = {}, inputLabelStyles,
      inputRenderer, options, labelRender, styles, isDark, theme,
    } = props
    const {
      up = 'UP_HEAD_FILLED', down = 'DOWN_HEAD_FILLED', size = 10, color = isDark ? 'WHITE' : 'TEXT',
    } = dropDownIcon
    const [visible, toggle] = useState(false)
    const [layoutDim, updateDim] = useState({ opacity: 0 })
    const [labelDim, updateLabelDim] = useState({ top: 0, left: 0, width: 0 })
  
    const measureLabelLayout = (x = 0, y = 0, width, height) => {
      // console.log(x, y, width, height, 'lol')
      updateLabelDim({
        top: y + height + SPACING.SPACE_6, left: x, width,
      })
    }
    const labelRef = useCallback((node) => {
      if (node && !position && visible) {
        node.measureInWindow(measureLabelLayout)
      }
      // console.log(node, position, visible, 'lol1')
    }, [visible])
  
    const onLayoutModal = ({ nativeEvent: { layout: { height: h, width: w } } }) => {
      const calcHeight = h > (DIMENSIONS.HEIGHT * (3 / 4)) ? DIMENSIONS.HEIGHT * (3 / 4) : h
      const top = (labelDim.top + calcHeight) >= DIMENSIONS.HEIGHT
        ? DIMENSIONS.HEIGHT - calcHeight - 10 : labelDim.top
  
      const calcWidth = w > (DIMENSIONS.WIDTH)
        ? (DIMENSIONS.WIDTH * (3 / 4)) : w
      const d = (labelDim.width - calcWidth) / 2
      let left = labelDim.left + d
      if (left + calcWidth >= DIMENSIONS.WIDTH) {
        left = DIMENSIONS.WIDTH - calcWidth - 10
      }
      // console.log(calcHeight, h, left, labelDim, calcWidth, w, 'lol4')
      updateDim({
        ...layoutDim, height: calcHeight, top, left, width: calcWidth, opacity: 1,
      })
    }
  
    const toggleModal = () => {
      if (visible && !position) {
        updateDim({ ...layoutDim, opacity: 0 })
      }
      toggle(!visible)
    }
  
    const itemRenderer = ({
      label, key, icon, selected, expandOptions,
      optionObj, expanded, renderMenuItem,
    }, onPressHandler) => {
      return (
        <View
          key={key}
          style={styles.optionsItem}
        >
          <TouchableHighlight
            onPress={onPressHandler}
            style={styles.optionLabelBtn}
            underlayColor={theme.underlay}
          >
            {renderLabel(label, optionObj, selected, labelRender, styles, isDark)}
          </TouchableHighlight>
          {expanded && expandOptions.map((item) => {
            const { labelKey: lKey, valueKey: vKey } = optionObj
            return renderMenuItem(item, lKey, vKey, renderItem)
          })}
        </View>
      )
    }
  
    const renderItem = (itemProps) => {
      const onPressHandler = () => {
        if (!itemProps.expandable) {
          toggleModal()
        }
        itemProps.onPress()
      }
      return itemRenderer(itemProps, onPressHandler)
    }
    let modalStyles = position ? {} : { position: 'absolute', ...layoutDim }
    if (isDark) {
      if (position === 'bottom') {
        modalStyles = { ...modalStyles, backgroundColor: COLORS.BLACK }
      } else {
        modalStyles = { ...modalStyles, backgroundColor: COLORS.BLACK_100 }
      }
    }
    return (
      <View style={[styles.container, containerStyles]}>
        <Dropdown {...props}>
          {({
            selectedLabel,
            placeholder,
            renderDropDownOptions,
            optionTitle,
          }) => (
            <>
              <TouchableHighlight
                onPress={toggleModal}
                underlayColor={theme.underlay}
                ref={labelRef}
                hitSlop={{
                  top: 2, left: 2, right: 2, bottom: 2,
                }}
              >
                {inputRenderer ? inputRenderer() : (
                  <View style={[styles.selectBtnView, inputStyles]}>
                    <CustomText style={[styles.inputLabel, inputLabelStyles]}>{`${selectedLabel || placeholder}  `}</CustomText>
                    <Icon name={ICONS[visible ? up : down]} size={size} color={COLORS[color]} />
                  </View>
                )}
              </TouchableHighlight>
              <CustomModal
                visible={visible}
                onDismiss={toggleModal}
                position={position}
                backdropColor={position ? COLORS.BACKDROP : 'transparent'}
                onLayout={onLayoutModal}
                style={[styles.optionContainer, modalStyles]}
              >
                {optionTitle && (
                  <CustomText weight="semi_bold" style={styles.optionTitle}>
                    {optionTitle}
                  </CustomText>
                )}
                <ScrollView contentContainerStyle={{ paddingVertical: position === 'bottom' ? SPACING.SPACE_16 : SPACING.SPACE_10 }} showsVerticalScrollIndicator={false}>
                  {renderDropDownOptions(renderItem)}
                </ScrollView>
              </CustomModal>
            </>
          )}
        </Dropdown>
      </View>
    )
  })
  
  const stylesheet = (theme, isDark) => StyleSheet.create({
    container: {},
    selectBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionContainer: {
      borderRadius: 6,
      ...shadowGenerator({ elevation: 25 }),
    },
    item: {
      paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
      paddingVertical: SPACING.SPACE_12,
    },
    optionTitle: {
      textAlign: 'center',
      paddingVertical: SPACING.SPACE_16,
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 1,
      marginHorizontal: SPACING.SPACE_8,
    },
    optionLabelBtn: {
      marginHorizontal: SPACING.SPACE_8,
      borderRadius: SPACING.SPACE_6,
    },
    optionLabel: {
      paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
      paddingVertical: SPACING.SPACE_10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    optionLabelText: {
      paddingLeft: SPACING.SPACE_12,
      paddingRight: SPACING.SPACE_32,
      // paddingTop: SPACING.SPACE_6,
    },
    tickIcon: {
      backgroundColor: isDark ? COLORS.WHITE : 'transparent',
      borderRadius: 40,
    },
    selectedOptionLabel: {
      backgroundColor: theme.bgSecondary,
      borderRadius: SPACING.SPACE_6,
    },
    optionsItem: {
      // marginBottom: SPACING.SPACE_20,
    },
  })
  
  export default withTheme(stylesheet)(ModalDropdown)
  
  ModalDropdown.defaultProps = {
  }
  
  ModalDropdown.propTypes = {
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    onChangeOption: PropTypes.func.isRequired,
    // selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    // position: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  }
  