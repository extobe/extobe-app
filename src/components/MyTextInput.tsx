/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';

import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string | null;
  showPW?: boolean;
};

export const MyTextInput: React.FC<Props> = (props) => {
  const {
    label,
    error,
    value,
    style,
    onBlur,
    onFocus,
    showPW,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isShowPW, setShowPW] = useState(true);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? colors.GREEN : colors.WHITEGREY;
  if (error) {
    color = 'red';
  }
  let colorLabel = isFocused ? colors.GREEN : '#9E9E9E';
  if (error) {
    colorLabel = 'red';
  }

  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <View style={style}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: color,
            },
          ]}
          ref={inputRef}
          {...restOfProps}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          secureTextEntry={showPW ? isShowPW : undefined}
        />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                transform: [
                  {
                    scale: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.75],
                    }),
                  },
                  {
                    translateY: focusAnim.interpolate({
                      inputRange: [0, 0.9],
                      outputRange: [12, -12],
                    }),
                  },
                  {
                    translateX: focusAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: colorLabel,
                },
              ]}
            >
              {label}
              {error ? '*' : ''}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
      {showPW && (
        <TouchableWithoutFeedback onPress={() => setShowPW(!isShowPW)}>
          <Image
            source={!isShowPW ? ICONS.iconShowPassword : ICONS.iconHidePassword}
            style={styles.imagePW}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: responsive(12),
    borderWidth: responsive(1),
    borderRadius: responsive(4),
    backgroundColor: colors.WHITEGREY,
    height: responsive(50),
  },
  labelContainer: {
    position: 'absolute',
    left: responsive(8),
    paddingHorizontal: responsive(8),
    backgroundColor: colors.WHITEGREY,
  },
  label: {
    ...TextStyles.mediumSemiBold,
    color: colors.GREY,
  },
  error: {
    marginTop: responsive(2),
    marginLeft: responsive(8),
    color: '#B00020',
    ...TextStyles.largeCaption,
  },
  imagePW: {
    width: responsive(22),
    height: responsive(18),
    position: 'absolute',
    top: responsive(16),
    right: responsive(50),
  },
});
