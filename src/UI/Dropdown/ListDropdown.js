import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Keyboard,
  Text,
} from 'react-native';

import CustomText from '../CustomText';
import CustomModal from '../CustomModal';
import Dropdown from '.';
import Icon from '../Icon';

import {withTheme} from '../../Theme/ThemeProvider';
import {
  DIMENSIONS,
  COLORS,
  SPACING,
  shadowGenerator,
  ICONS,
  FONTS,
  normalize,
} from '../../Theme';

const {HEIGHT} = DIMENSIONS;
const DROPDOWN_HEIGHT = 250;

class ListDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.labelRef = React.createRef();
    this.state = {
      visible: false,
      layoutDim: {},
      containerWidth: props.minWidth || 0,
    };
    this.keyboardDim = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const {options, searchProps, staticSearch} = this.props;
    const {visible} = this.state;
    if (visible && prevProps.options.length !== options.length) {
      this.measureModal(options.length * 10 + 50);
    }
    if (visible !== prevState.visible && (searchProps || staticSearch)) {
      if (visible) {
        Keyboard.addListener(
          'keyboardDidShow',
          this.keyboardDidShow.bind(this),
        );
        Keyboard.addListener(
          'keyboardDidHide',
          this.keyboardDidHide.bind(this),
        );
      } else {
        Keyboard.removeListener('keyboardDidShow');
        Keyboard.removeListener('keyboardDidHide');
      }
    }
  }

  keyboardDidShow = e => {
    const {layoutDim = {}} = this.state;
    const {height = 100} = layoutDim;
    this.keyboardDim = e.endCoordinates;
    this.measureModal(height);
  };

  keyboardDidHide = () => {
    this.keyboardDim = {};
    const {layoutDim = {}} = this.state;
    const {height = 100} = layoutDim;
    this.measureModal(height);
  };

  measureModal = modalHeight => {
    const measureLabelLayout = (x, y, h, w) => {
      this.measureLabelLayout(x, y, h, w, modalHeight);
    };
    if (this.labelRef.current)
      this.labelRef.current.measureInWindow(measureLabelLayout);
  };

  renderLabel = (label, optionObj, selected, expanded) => {
    const {labelRender, itemStyles = {}, styles, isDark} = this.props;
    if (labelRender) {
      return labelRender(optionObj, label, selected, expanded, isDark);
    }
    let textColor = selected ? 'blue' : 'text';
    if (isDark) {
      textColor = selected ? 'blue_300' : 'white';
    }
    return (
      <CustomText style={[styles.item, itemStyles]} color={textColor}>
        {label}
      </CustomText>
    );
  };

  measureLabelLayout = (
    x = 0,
    y = HEIGHT - 100,
    width = DIMENSIONS.WIDTH,
    height = 100,
    modalHeight = 0,
  ) => {
    // console.log(x, y, width, height, this.state.containerWidth, 'pop3')
    let left = x;
    const screenHeight = this.keyboardDim.height
      ? HEIGHT - this.keyboardDim.height
      : HEIGHT;
    if (left + width >= DIMENSIONS.WIDTH) {
      left = DIMENSIONS.WIDTH - width - 5;
    }
    const calcHeight =
      modalHeight > DROPDOWN_HEIGHT ? DROPDOWN_HEIGHT : modalHeight;
    let top = y + height + 5;
    top = top + calcHeight >= screenHeight ? screenHeight - calcHeight : top;
    const layoutDim = {
      // width,
      left,
      top: top - 25,
      height: calcHeight,
      opacity: 1,
    };
    this.setState({
      layoutDim: {...layoutDim},
    });
  };

  onLayoutModal = ({
    nativeEvent: {
      layout: {height: modalHeight},
    },
  }) => {
    const measureLabelLayout = (x, y, h, w) => {
      this.measureLabelLayout(x, y, h, w, modalHeight);
    };
    this.labelRef.current.measureInWindow(measureLabelLayout);
  };

  renderItem = itemProps => {
    const onPressHandler = () => {
      if (!itemProps.expandable) {
        this.toggleDropdown();
      }
      itemProps.onPress();
    };
    // console.log(itemProps, 'itemProps....')
    return this.itemRenderer(itemProps, onPressHandler);
  };

  toggleDropdown = () => {
    if (!this.state.visible) {
      Keyboard.dismiss();
    }
    this.setState(prevState => ({
      visible: !prevState.visible,
      layoutDim: {...prevState.layoutDim, opacity: 0},
    }));
  };

  itemRenderer = (
    {
      label,
      key,
      icon,
      selected,
      expandOptions,
      optionObj,
      expanded,
      renderMenuItem,
    },
    onPressHandler,
  ) => {
    const {styles, isDark} = this.props;
    return (
      <View key={key} style={styles.optionsItem}>
        <TouchableHighlight
          onPress={onPressHandler}
          underlayColor={isDark ? COLORS.BLACK_100 : COLORS.UNDERLAY}>
          {this.renderLabel(label, optionObj, selected, expanded)}
        </TouchableHighlight>
        {expanded &&
          expandOptions.map(item => {
            const {labelKey: lKey, valueKey: vKey} = optionObj;
            return renderMenuItem(item, lKey, vKey, this.renderItem);
          })}
      </View>
    );
  };

  renderError = () => {
    const {error, errorMsg, errorTextStyles, styles} = this.props;
    if (error) {
      return (
        <View style={styles.error}>
          {!!errorMsg && (
            <CustomText
              inputProps={{
                numberOfLines: 1,
                ellipsizeMode: 'tail',
              }}
              size="tiny"
              style={[styles.errorText, errorTextStyles]}>
              {errorMsg}
            </CustomText>
          )}
        </View>
      );
    }
    return null;
  };

  render() {
    const {
      label,
      labelStyles,
      inputStyles,
      containerStyles,
      inputContainerStyles,
      styles,
      dropDownIconName,
      showDropDownIcon = true,
      error,
      dropdownIconSize = 10,
      position,
      modalProps = {},
      searchValue,
      searchInputStyles,
      minWidth,
      inputBtnStyles = {},
      isDark,
    } = this.props;
    const {visible, layoutDim, containerWidth} = this.state;
    const modalStyles = position
      ? {}
      : {position: 'absolute', width: containerWidth, ...layoutDim};
    const dropDownIcon =
      dropDownIconName || (visible ? 'UP_HEAD_FILLED' : 'DOWN_HEAD_FILLED');
    const inputProps = {
      caretHidden: true,
      showSoftInputOnFocus: false,
      onChangeText: () => null,
      // onFocus: () => Keyboard.dismiss(),
      // onLayout: () => this.labelRef.current.measureInWindow(this.measureLabelLayout)
    };
    // if (searchProps) {
    //   inputProps = {
    //     ...searchProps,
    //   }
    // }
    return (
      <View style={[styles.container, containerStyles]}>
        <Dropdown {...this.props} visible={visible}>
          {({
            selectedLabel = '',
            placeholder,
            renderDropDownOptions,
            searchProps,
          }) => (
            <>
              <View
                style={[
                  styles.inputContainer,
                  error ? styles.inputError : {},
                  inputContainerStyles,
                ]}
                onLayout={({
                  nativeEvent: {
                    layout: {width},
                  },
                }) => {
                  if (minWidth) return;
                  this.setState({containerWidth: width});
                }}
                ref={this.labelRef}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.toggleDropdown}
                  style={[{flex: 1}, inputBtnStyles]}>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Text style={[styles.input, inputStyles]} numberOfLines={1}>
                      {selectedLabel ? (
                        selectedLabel.toString()
                      ) : placeholder ? (
                        <Text
                          numberOfLines={1}
                          style={{
                            color: isDark ? COLORS.BLACK_30 : COLORS.GREY_100,
                          }}>
                          {placeholder}
                        </Text>
                      ) : (
                        <CustomText
                          style={[styles.labelStyles, labelStyles]}>
                          {label}
                        </CustomText>
                      )}
                    </Text>
                    {showDropDownIcon && (
                      <Icon
                        style={styles.dropDownIcon}
                        name={ICONS[dropDownIcon]}
                        color={COLORS[isDark ? 'BLACK_60' : 'TEXT']}
                        size={dropdownIconSize}
                      />
                    )}
                  </View>
                </TouchableHighlight>
              </View>
              <CustomModal
                visible={visible}
                onDismiss={this.toggleDropdown}
                position={position}
                backdropColor={position ? COLORS.BACKDROP : 'transparent'}
                onLayout={this.onLayoutModal}
                style={[styles.optionContainer, modalStyles]}
                {...modalProps}>
                {searchProps ? (
                  <TextInput
                    value={searchValue}
                    placeholder={placeholder}
                    placeholderTextColor={
                      isDark ? COLORS.BLACK_30 : COLORS.GREY_100
                    }
                    style={[styles.searchInput, searchInputStyles]}
                    {...searchProps}
                  />
                ) : null}
                <ScrollView
                  keyboardDismissMode="none"
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}>
                  {renderDropDownOptions(this.renderItem)}
                </ScrollView>
              </CustomModal>
            </>
          )}
        </Dropdown>
      </View>
    );
  }
}

const stylesheet = theme =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0,
      borderRadius: 6,
      backgroundColor: theme.bgSecondary,
      height: normalize(50),
      paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
      // ...shadowGenerator({ elevation: 12 }),
    },
    optionContainer: {
      borderRadius: 6,
      ...shadowGenerator({elevation: 3}),
    },
    item: {
      paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
      paddingVertical: SPACING.SPACE_12,
    },
    input: {
      paddingHorizontal: 0,
      lineHeight: SPACING.SPACE_28,
      flex: 1,
      fontSize: FONTS.REGULAR,
      paddingVertical: DIMENSIONS.INPUT_VERTICAL,
      fontWeight: 'normal',
      color: theme.textPrimary,
    },
    labelStyles: {
      color: COLORS.GREY_100
    },
    error: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: SPACING.SPACE_4,
      flex: 0.4,
      alignSelf: 'flex-end',
    },
    errorText: {
      marginRight: SPACING.SPACE_12,
    },
    inputError: {
      borderColor: COLORS.RED,
      borderWidth: 1,
      borderBottomColor: COLORS.RED,
      borderBottomWidth: 1,
    },
    dropDownIcon: {
      paddingHorizontal: SPACING.SPACE_12,
      alignItems: 'center',
      textAlignVertical: 'center',
      paddingVertical: SPACING.SPACE_8,
      position: 'relative',
      left: SPACING.SPACE_8,
      alignSelf: 'center',
    },
    searchInput: {
      marginHorizontal: SPACING.SPACE_10,
      fontSize: FONTS.SMALL,
      fontWeight: 'normal',
      borderBottomWidth: 1,
      borderBottomColor: theme.linkColor,
      paddingVertical: SPACING.SPACE_2,
      padding: 0,
      margin: 0,
      textAlignVertical: 'center',
      color: theme.textPrimary,
    },
    optionsItem: {
      backgroundColor: theme.bgSecondary,
    },
  });

export default withTheme(stylesheet)(ListDropdown);
