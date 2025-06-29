import React from 'react';

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

import { colors, TextStyles } from '@styles';

export type Props = TouchableOpacityProps & {
  buttonText?: string;
  textStyle?: TextStyle;
};

export const MyButton: React.FC<Props> = ({
  buttonText = 'Button',
  ...others
}) => {
  return (
    <>
      <TouchableOpacity {...others}>
        <Text style={{ ...styles.textStyle }}>{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: colors.WHITE,
    textAlign: 'center',
    ...TextStyles.largeBold,
  },
});
