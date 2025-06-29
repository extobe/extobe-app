import React from 'react';

import { Text, View, StyleSheet, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { MyButton } from './MyButton';

import { IMAGES } from '@assets/images';

interface Props {}
export const ComingSoon = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  return (
    <View style={styles.view}>
      <Image
        source={IMAGES.ComingSoon}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.txt}>
        We’re currently working on creating our new website .We’ll be lauching
        soon, subscribe to be notified.
      </Text>
      <MyButton
        buttonText={'Go Back'}
        textStyle={{ alignItems: 'center' }}
        onPress={() => {
          navigate('Home');
        }}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.BLUESKY,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(220),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    height: responsive(50),
  },
  txt: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumRegular,
    marginHorizontal: responsive(30),
    marginVertical: responsive(40),
  },
  image: {
    width: responsive(274),
    height: responsive(154),
  },
});
