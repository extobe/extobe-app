/* eslint-disable react-native/no-inline-styles */

/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext, useState } from 'react';

import { View, Text, StyleSheet, TextInput } from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { MyButton } from '@components/MyButton';

import { login12Character } from '@services/Auth';
import { TextStyles, colors, responsive } from '@styles';
import { showMess } from '@utils/Helper';

interface Props {}
export const WordMnemonicScreen = ({}: Props) => {
  const { t } = useTranslation();
  const common = useContext(CommonContext);
  const auth = useContext(AuthUserContext);
  const [confirmWord, setConfirmWord] = useState<string>('');
  const time = Date.now();

  const handleSignIn = async () => {
    common?.setLoading?.(true);
    const res = await login12Character(confirmWord.split(' ').toString(), time);
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 207) {
        AsyncStorage.setItem('token', res?.data?.message);
        auth?.setAuth?.(!auth?.isAuth);
        AsyncStorage.setItem('resUser', JSON.stringify(res?.data?.data));
        showMess(t('validation:login.LoginSuccess'), 'success');
      }
      if (res?.data?.code === 112) {
        showMess(t('validation:all.AccountHasBeenLocked'), 'error');
      }
      if (res?.data?.code === 113) {
        showMess(t('validation:twelveWord.IncorrectCharacters'), 'error');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        {t('screens:twelveWord.VerifyAccountRecoveryPhrases')}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.viewConfirmWord}>
          <TextInput
            value={confirmWord}
            onChangeText={(val) => setConfirmWord(val)}
            style={{ color: 'gray' }}
            placeholder={t('validation:twelveWord.PleaseEnterAll12Phrases')}
            placeholderTextColor={colors.GREYSEMI}
            style={styles.styleInput}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.txtTwo}>
          {t('screens:twelveWord.ThereAre12Single')}
        </Text>
        {confirmWord.split(' ').length >= 12 ? (
          <MyButton
            buttonText={t('screens:login.LogIn')}
            textStyle={{ alignItems: 'center' }}
            onPress={handleSignIn}
            style={styles.presChangeColor}
          />
        ) : (
          <MyButton
            buttonText={t('screens:login.LogIn')}
            textStyle={{ alignItems: 'center' }}
            onPress={() => {
              showMess(
                t('validation:twelveWord.PleaseEnterAll12Phrases'),
                'error',
              );
            }}
            style={styles.presChangeColor}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsive(16),
    opacity: 0.93,
    justifyContent: 'center',
  },
  styleInput: {
    color: colors.DARK,
    width: responsive(330),
    height: responsive(140),
  },
  viewConfirmWord: {
    borderRadius: responsive(5),
    borderColor: colors.GREEN,
    width: responsive(350),
    height: responsive(160),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    paddingTop: responsive(10),
    paddingLeft: responsive(10),
  },
  presChangeColor: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: responsive(12),
    marginTop: responsive(25),
    height: responsive(50),
    width: responsive(280),
    borderRadius: responsive(25),
    backgroundColor: colors.GREEN,
    alignItems: 'center',
  },
  txt: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumSemiBold,
    paddingBottom: responsive(6),
  },
  txtTwo: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumSemiBold,
    paddingTop: responsive(10),
    paddingBottom: responsive(30),
  },
});
