import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import {COLORS, FONTS, normalize, SPACING} from '../Theme';
import {useTheme, withTheme} from '../Theme/ThemeProvider';
import CustomText from './CustomText';

class InfoCard extends Component {
  render() {
    const {styles, titleColor, children, cardTitle, containerStyle} =
      this.props;

    return (
      <View style={styles.cardContainer}>
        <CustomText
          weight="bold"
          style={[styles.cardTitle]}>
          {cardTitle}
        </CustomText>
        {children}
      </View>
    );
  }
}

const stylesheet = (theme, mode) =>
  StyleSheet.create({
    cardContainer: {
      justifyContent: 'center',
      paddingVertical: normalize(20),
      paddingHorizontal: normalize(16),
      backgroundColor: COLORS.INFOCARD_BG,
      borderRadius: 8,
      marginVertical: SPACING.SPACE_20
    
    },
  });

InfoCard.defaultProps = {
  weight: 'normal',
  size: 'regular',
  style: {},
  color: '',
  extraProps: {},
  center: false,
  flex: 0,
};

InfoCard.propTypes = {
  weight: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  extraProps: PropTypes.object,
  center: PropTypes.bool,
  flex: PropTypes.number,
};

export default withTheme(stylesheet)(InfoCard);
