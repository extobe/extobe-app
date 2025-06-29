import { ViewStyle } from 'react-native';

import { scale } from 'react-native-size-matters';

export const genSVGProps = (
  width: number,
  height: number,
  color?: string,
  style?: ViewStyle,
) => {
  return {
    width: scale(width),
    height: scale(height),
    color,
    style,
  };
};
