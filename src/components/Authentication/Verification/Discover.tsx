/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Circle, G, Svg } from 'react-native-svg';

import { colors, responsive, TextStyles } from '@styles';

const size = 180;
const strokeWidth = 8;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

export type Props = {
  percentage: number;
};
const Discover: React.FC<Props> = ({ percentage }) => {
  const value = () => {
    let a = 0;
    if (percentage) {
      a = percentage * 3;
    }
    return a;
  };
  // const progressAnimation = useRef(new Animated.Value(0)).current;
  // const animation = (toValue: any) => {
  //   return Animated.timing(progressAnimation, {
  //     toValue,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 100 }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={center}>
            <Circle
              stroke={colors.GREEN}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={colors.GREYLIGHT}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference + (circumference * value()) / 180}
            />
          </G>
        </Svg>
        <TouchableOpacity style={styles.view}>
          <Text
            style={{
              color: colors.BLUEBOLD,
              ...TextStyles.mediumBold,
              fontSize: responsive(45),
            }}
          >
            {percentage}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsive(20),
  },
  view: {
    position: 'absolute',
    top: responsive(40),
  },
});
export default Discover;
