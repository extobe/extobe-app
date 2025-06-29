/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ArrayInput from '@components/Authentication/Verification/ArrayInput';
import Discover from '@components/Authentication/Verification/Discover';

import { RootNavigationProp, RootScreenRouteProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const VerificationScreen = ({ route }: Props) => {
  const { t } = useTranslation();

  const common = useContext(CommonContext);
  const idFlatVerifi = route?.params?.id;

  const { navigate } = useNavigation<RootNavigationProp>();

  const back = () => {
    if (idFlatVerifi === 1) {
      navigate('Register');
    } else if (idFlatVerifi === 2) {
      navigate('Login');
    } else if (idFlatVerifi === 3) {
      navigate('Login');
    }
  };

  useEffect(() => {
    if (!common?.timeCountDown) {
      return;
    }
    const intervalId = setInterval(() => {
      common?.setTimeCountDown?.(common?.timeCountDown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [common?.timeCountDown]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={back}>
          <Image
            source={ICONS.iconBack}
            style={styles.imageBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.txtLogin}>
          {t('screens:register.Verification')}
        </Text>
        <Discover percentage={common?.timeCountDown} />
        <ArrayInput time={common?.timeCountDown} idFlatVerifi={idFlatVerifi} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsive(20),
  },
  txtLogin: {
    marginTop: responsive(50),
    marginBottom: responsive(75),
    color: colors.BLUEBOLD,
    ...TextStyles.heading3,
  },
  imageBack: {
    height: responsive(18),
    width: responsive(18),
  },
});
