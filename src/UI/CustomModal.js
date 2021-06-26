import React from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import PropTypes from 'prop-types'

import { ModalSnackBar } from './Snackbar'
import { COLORS, DIMENSIONS } from '../Theme'
import { useTheme } from '../Theme/ThemeProvider'

const { HEIGHT: screenHeight, WIDTH: screenWidth } = DIMENSIONS
const POSITION_MAP = {
  top: 'flex-start',
  bottom: 'flex-end',
  center: 'center',
}

const CustomModal = ({
  visible,
  height,
  statusBarTranslucent, // Used to draw modal over statusBar. Use only when keyboard doesn't show up on modal.
  fullScreen, // send this as true to avoid drawing under statusbar when fullScreens
  onDismiss,
  dismissKey,
  children,
  position,
  animationType,
  style,
  transparent,
  modalRef,
  onLayout,
  backdropColor,
}) => {
  const { styles, theme } = useTheme(stylesheet)
  const modalHeight = screenHeight * height
  const extraStyles = { justifyContent: fullScreen ? undefined : POSITION_MAP[position] }
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={() => onDismiss(dismissKey)}
      statusBarTranslucent={statusBarTranslucent}
    >
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={[styles.modalView, extraStyles]}
      >
        <SafeAreaView style={[styles.modalView, extraStyles]}>
          <TouchableHighlight
            underlayColor={backdropColor || theme.backdrop}
            style={[styles.backdrop, { backgroundColor: backdropColor || theme.backdrop }]}
            onPress={() => onDismiss(dismissKey)}
          >
            <View
              style={[styles.backdrop]}
            />
          </TouchableHighlight>
          <View
            style={[
              styles.modalContainer,
              { minHeight: modalHeight },
              style,
            ]}
            onLayout={onLayout}
            ref={modalRef}
          >
            {children}
          </View>
          <ModalSnackBar />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const stylesheet = (theme, isDark) => StyleSheet.create({
  modalView: {
    flex: 1,
  },
  backdrop: {
    height: screenHeight,
    width: screenWidth,
    position: 'absolute',
    opacity: isDark ? 0.2 : 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: theme.bgPrimary,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.bgPrimary,
  },
})

export default React.forwardRef((props, ref) => (
  <CustomModal modalRef={ref} {...props} />
))

CustomModal.defaultProps = {
  visible: false,
  height: 0,
  fullScreen: false,
  statusBarTranslucent: false,
  onDismiss: () => null,
  dismissKey: '',
  position: 'bottom',
  animationType: 'fade',
  style: {},
  transparent: true,
  modalRef: null,
  onLayout: () => null,
  backdropColor: '',
}

CustomModal.propTypes = {
  visible: PropTypes.bool,
  height: PropTypes.number,
  fullScreen: PropTypes.bool,
  statusBarTranslucent: PropTypes.bool,
  onDismiss: PropTypes.func,
  position: PropTypes.oneOf(Object.keys(POSITION_MAP)),
  animationType: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  transparent: PropTypes.bool,
  dismissKey: PropTypes.string,
  modalRef: PropTypes.node,
  onLayout: PropTypes.func,
  backdropColor: PropTypes.string,
}