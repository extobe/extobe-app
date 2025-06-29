/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootNavigationProp } from '@navigation/navigator';
import { newPassword } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';

import { MyButton } from '../../../components/MyButton';
import { MyTextInput } from '../../../components/MyTextInput';
import { showMess } from '../../../utils';

import { ICONS } from '@assets/icons';

interface Props {}
export const NewPassWord = ({}: Props) => {
  const { t } = useTranslation();
  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const { navigate } = useNavigation<RootNavigationProp>();

  const [password, setPassword] = useState<string>('');
  const [passwordCF, setPasswordCF] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorPasswordCF, setErrorPasswordCF] = useState<string>();

  const isValidField = useCallback((value?: string) => {
    if (value && value.length > 0) {
      return true;
    }
  }, []);

  useEffect(() => {
    if (isValidField(password)) {
      setErrorPassword(undefined);
    }
  }, [password, isValidField]);
  useEffect(() => {
    if (isValidField(passwordCF)) {
      setErrorPasswordCF(undefined);
    }
    if (passwordCF !== password) {
      setErrorPasswordCF(t('validation:login.PasswordDoesNotMatch'));
    }
  }, [passwordCF, isValidField]);

  const validatePassword = useCallback(() => {
    if (isValidField(password)) {
      setErrorPassword(undefined);
      return true;
    } else {
      setErrorPassword(t('validation:login.YouMustEnterPassword'));
      return false;
    }
  }, [password, isValidField]);

  const validatePasswordCF = useCallback(() => {
    if (isValidField(passwordCF) && passwordCF === password) {
      setErrorPasswordCF(undefined);
      return true;
    } else {
      setErrorPasswordCF(t('validation:login.YouMustEnterPassword'));
      return false;
    }
  }, [passwordCF, isValidField, password]);

  const validateNewPW = useCallback(async () => {
    validatePassword();
    validatePasswordCF();
  }, [validatePassword, password, validatePasswordCF, passwordCF]);

  const validNewPW = useMemo(() => {
    return isValidField(password) && isValidField(passwordCF);
  }, [password, passwordCF, isValidField]);

  const SubmitNewPW = () => {
    if (validNewPW) {
      Submit();
    } else {
      validateNewPW();
    }
  };

  const back = () => {
    navigate('Login');
  };

  const Submit = async () => {
    common?.setLoading?.(true);
    const res = await newPassword(auth?.email, passwordCF);
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 200) {
        showMess(t('validation:all.SuccessfulImplementation'), 'success');
        navigate('Login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={back}>
          <Image
            source={ICONS.iconClose}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.txtLogin}>{t('screens:login.NewPassword')}</Text>

        <MyTextInput
          autoCapitalize="none"
          value={password}
          onChangeText={(val) => setPassword(val)}
          error={errorPassword}
          onBlur={validatePassword}
          label={t('screens:login.Password')}
          style={styles.textField}
          showPW
        />
        <MyTextInput
          autoCapitalize="none"
          value={passwordCF}
          onChangeText={(val) => setPasswordCF(val)}
          error={errorPasswordCF}
          onBlur={validatePasswordCF}
          label={t('screens:login.PasswordCF')}
          style={styles.textField}
          showPW
        />

        <MyButton
          buttonText={t('screens:login.LogIn')}
          textStyle={{ alignItems: 'center' }}
          onPress={SubmitNewPW}
          style={
            validNewPW
              ? { ...styles.button, backgroundColor: colors.GREEN }
              : styles.button
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: responsive(20),
    backgroundColor: 'white',
    paddingBottom: responsive(50),
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(334),
    justifyContent: 'center',
    backgroundColor: colors.GREYLIGHT,
    height: responsive(50),
    marginTop: responsive(40),
  },
  textField: {
    marginBottom: responsive(30),
    width: responsive(334),
    height: responsive(50),
  },
  txtLogin: {
    marginTop: responsive(50),
    marginBottom: responsive(75),
    color: colors.BLUEBOLD,
    ...TextStyles.heading3,
  },
  txtError: {
    marginBottom: responsive(12),
    marginTop: responsive(2),
    marginLeft: responsive(8),
    color: '#B00020',
    ...TextStyles.largeCaption,
  },
  image: {
    height: responsive(15),
    width: responsive(15),
    marginTop: responsive(60),
  },
});
