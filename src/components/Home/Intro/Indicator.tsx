/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, Dimensions, Animated, StyleSheet } from 'react-native';

import { colors, responsive } from '@styles';

import { introSlide } from '../../../configs/intro';

const { width } = Dimensions.get('window');

export type Props = {
  scrollX: any;
};
const Indicator: React.FC<Props> = ({ scrollX }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: responsive(30) }}>
      {introSlide.map((_, i) => {
        const inputRange = [
          (i - 2) * width,
          (i - 1) * width,
          i * width,
          (i + 1) * width,
          (i + 2) * width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 10, 22, 10, 10],
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            colors.GREYLIGHT,
            colors.GREYLIGHT,
            introSlide[i].color,
            colors.GREYLIGHT,
            colors.GREYLIGHT,
          ],
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[styles.dot, { backgroundColor, width: dotWidth }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: responsive(10),
    borderRadius: responsive(5),
    marginHorizontal: responsive(6),
  },
});
export default Indicator;
