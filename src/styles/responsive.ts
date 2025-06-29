import { Platform, PixelRatio, Dimensions } from 'react-native';

export const responsive = (size: number, exactly?: boolean) => {
  // based on iPhone X's scale
  const { width } = Dimensions.get('window');
  const SCALE_FACTOR = width / 375;

  const newSize = size * SCALE_FACTOR;
  if (exactly) {
    return newSize;
  }
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
export const WIDTH = Dimensions.get('screen').width;
export const HEIGHT = Dimensions.get('screen').height;

export const responsiveByHeight = (size: number) => {
  // based on iPhone X's scale
  const SCALE_FACTOR = HEIGHT / 812;

  const newSize = size * SCALE_FACTOR;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};
