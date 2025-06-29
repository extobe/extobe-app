/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  RootScreenNavigationProp,
  RootScreenRouteProp,
} from '@navigation/navigator';
import { login, login2FA, login2FAByPhone, loginByPhone } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';

import { MyButton } from '../../../components/MyButton';
import { MyTextInput } from '../../../components/MyTextInput';
import { showMess } from '../../../utils';
import ForgotPW from './ForgotPW';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const LoginScreen = ({ route }: Props) => {
  const country = route?.params?.country;

  const { t } = useTranslation();
  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const [email, setEmail] = useState<string>('');
  const [numberPhone, setNumberPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>();
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorNumberPhone, setErrorNumberPhone] = useState<string>();
  const [option, setOption] = useState<number>(0);
  const [flat2FA, setFlat2FA] = useState<boolean>(false);
  const [code2FA, setCode2FA] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const time = Date.now();

  const selectOption = () => {
    if (option === 0) {
      setOption(1);
    } else {
      setOption(0);
    }
  };
  const backWelcome = () => {
    navigate('Welcome');
  };
  const openRegister = () => {
    navigate('CurrentLocation');
  };
  const openSelectLanguage = () => {
    navigate('SelectLanguage', { id: 1 });
  };

  const isValidField = useCallback((value?: string) => {
    if (value && value.length > 0) {
      return true;
    }
  }, []);

  useEffect(() => {
    auth?.setEmail?.(email);
  }, [email]);

  useEffect(() => {
    if (isValidField(email)) {
      setErrorEmail(undefined);
    }
  }, [email, isValidField]);

  useEffect(() => {
    if (isValidField(password)) {
      setErrorPassword(undefined);
    }
  }, [password, isValidField]);

  useEffect(() => {
    if (isValidField(numberPhone)) {
      setErrorNumberPhone(undefined);
    }
  }, [numberPhone, isValidField]);

  const validateEmailFomat = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validateEmail = useCallback(() => {
    if (isValidField(email) && validateEmailFomat(email)) {
      setErrorEmail(undefined);
      return true;
    } else if (!isValidField(email)) {
      setErrorEmail(t('validation:login.YouMustEnterEmail'));
      return false;
    } else if (!validateEmailFomat(email)) {
      setErrorEmail(t('validation:all.EmailNotFormat'));
      return false;
    }
  }, [email, isValidField]);

  const validatePassword = useCallback(() => {
    if (isValidField(password)) {
      setErrorPassword(undefined);
      return true;
    } else {
      setErrorPassword(t('validation:login.YouMustEnterPassword'));
      return false;
    }
  }, [password, isValidField]);

  const validateNumberPhone = useCallback(() => {
    if (isValidField(numberPhone)) {
      setErrorNumberPhone(undefined);
      return true;
    } else {
      setErrorNumberPhone(t('validation:register.YouMustEnterNumberPhone'));
      return false;
    }
  }, [numberPhone, isValidField]);

  const validateLogin = useCallback(async () => {
    validateEmail();
    validatePassword();
    validateNumberPhone();
  }, [
    validateEmail,
    validatePassword,
    validateNumberPhone,
    email,
    password,
    numberPhone,
    auth,
  ]);

  const submitLogin = async () => {
    common?.setLoading?.(true);
    const res =
      option === 0
        ? await login(email, password, time)
        : await loginByPhone(
            country
              ? country?.phone_code?.substring(1).concat(numberPhone)
              : `84${numberPhone}`,
            password,
            time,
          );
    common?.setLoading?.(false);

    // console.log('====================================');
    // console.log({ res?.data });
    // console.log('====================================');
    if (res?.data) {
      if (
        res?.data?.code === 202 &&
        res?.data?.data?.is_verify_2fa === false &&
        option === 1
      ) {
        setFlat2FA(false);
        AsyncStorage.setItem('resUser', JSON.stringify(res?.data?.data));
        AsyncStorage.setItem('token', res?.data?.message);
        auth?.setAuth?.(!auth?.isAuth);
        showMess(t('validation:login.LoginSuccess'), 'success');
      }
      if (
        res?.data?.code === 202 &&
        res?.data?.data?.is_verify_2fa === false &&
        option === 0
      ) {
        setFlat2FA(false);
        AsyncStorage.setItem('resUser', JSON.stringify(res?.data?.data));
        navigate('Verification', { id: 2 });
        common?.setTimeCountDown?.(60);
        showMess(t('validation:login.YouMustEnterCodeMail'), 'success');
      }
      if (res?.data?.code === 202 && res?.data?.data?.is_verify_2fa === true) {
        AsyncStorage.setItem('resUser', JSON.stringify(res?.data?.data));
        setFlat2FA(true);
      }
      if (
        res?.data?.code === 202 &&
        res?.data?.data?.is_verify_2fa === true &&
        flat2FA === true
      ) {
        submitLogin2FA();
      }
      if (res?.data?.message === 'Email and password does not exist') {
        showMess(t('validation:login.EmailOrPasswordIncorrect'), 'error');
      }
      if (res?.data?.message === 'phone and password does not exist') {
        showMess(t('validation:login.PhoneOrPasswordIncorrect'), 'error');
      }
      if (res?.data?.code === 112) {
        showMess(t('validation:all.AccountHasBeenLocked'), 'error');
      }
    } else {
      showMess(t('validation:login.EmailOrPasswordIncorrect'), 'error');
    }
  };

  const submitLogin2FA = async () => {
    common?.setLoading?.(true);
    const res =
      option === 0
        ? await login2FA(email, code2FA)
        : await login2FAByPhone(
            country
              ? country?.phone_code?.substring(1).concat(numberPhone)
              : `84${numberPhone}`,
            code2FA,
          );
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 202) {
        AsyncStorage.setItem('token', res?.data?.message);
        auth?.setAuth?.(!auth?.isAuth);
        showMess(t('validation:login.LoginSuccess'), 'success');
      }
      if (res?.data?.code === 111) {
        showMess(t('validation:all.OTPCodeIsNotCorrect'), 'error');
      }
      if (res?.data?.code === 112) {
        showMess(t('validation:all.AccountHasBeenLocked'), 'error');
      }
    }
  };

  const validLogin = useMemo(() => {
    return (
      (isValidField(email) &&
        validateEmailFomat(email) &&
        isValidField(password)) ||
      (isValidField(password) && isValidField(numberPhone))
    );
  }, [password, email, numberPhone, isValidField]);

  const Login = () => {
    if (validLogin) {
      // if (!flat2FA) {
      submitLogin();
      // } else {
      //   submitLogin2FA();
      // }
    } else {
      validateLogin();
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={backWelcome}>
          <Image
            source={ICONS.iconClose}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.txtLogin}>{t('screens:login.LogIn')}</Text>
        <View style={styles.viewOption}>
          <TouchableOpacity onPress={selectOption} disabled={option === 0}>
            <Text
              style={[
                styles.txtOption,
                { color: option ? colors.GREY : colors.GREEN },
              ]}
            >
              {t('screens:login.ByEmail')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectOption} disabled={option === 1}>
            <Text
              style={[
                styles.txtOption,
                { color: !option ? colors.GREY : colors.GREEN },
              ]}
            >
              {t('screens:login.ByPhoneNumber')}
            </Text>
          </TouchableOpacity>
        </View>
        {option === 0 && (
          <MyTextInput
            autoCapitalize="none"
            error={errorEmail}
            value={email}
            onChangeText={(val) => setEmail(val)}
            onBlur={validateEmail}
            label={t('screens:login.Email')}
            style={styles.textField}
          />
        )}
        {option === 1 && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.viewNumberPhone}
              onPress={openSelectLanguage}
            >
              <Image
                source={
                  country?.path ? { uri: country?.path } : ICONS?.iconVietNam
                }
                style={styles.imageCountry}
                resizeMode="contain"
              />
              <Text style={styles.txtNumber}>
                {country?.phone_code ? country?.phone_code : '+84'}
              </Text>
              <Image
                source={ICONS.iconListDown}
                style={styles.imageListDown}
                resizeMode="contain"
              />
              <Text style={styles.txtColumn}>|</Text>
            </TouchableOpacity>
            <TextInput
              value={numberPhone}
              onChangeText={(val) => setNumberPhone(val)}
              onBlur={validateNumberPhone}
              style={styles.viewInputNumberPhone}
              placeholder={t('screens:login.EnterYourPhoneNumber')}
            />
          </View>
        )}
        {option === 1 && (
          <Text style={styles.txtError}>{errorNumberPhone}</Text>
        )}
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
        {flat2FA && (
          <>
            <MyTextInput
              value={code2FA}
              onChangeText={(val) => setCode2FA(val)}
              label={t('screens:login.Code2FA')}
              style={[
                styles.textField,
                { ...styles.textField, marginBottom: responsive(5) },
              ]}
              keyboardType="numeric"
              maxLength={6}
            />
            {code2FA === '' && (
              <Text style={styles.txtError}>
                {t('validation:login.YouMustEnter2FA')}
              </Text>
            )}
          </>
        )}
        <MyButton
          buttonText={t('screens:login.LogIn')}
          textStyle={{ alignItems: 'center' }}
          onPress={Login}
          // disabled={!validLogin}
          style={
            validLogin
              ? { ...styles.button, backgroundColor: colors.GREEN }
              : styles.button
          }
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <Text style={[styles.txtForgotPW, { marginBottom: responsive(0) }]}>
            {t('screens:login.ForgotPW')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('WordMnemonic');
          }}
        >
          <Text style={styles.txtForgotPW}>Login with 12 Character?</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.txtDontAccount}>
            {t('screens:login.NotAccount')}
          </Text>
          <TouchableOpacity onPress={openRegister}>
            <Text style={styles.txtSignup}>{t('screens:login.SignUp')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ForgotPW visible={visible} dismiss={() => setVisible(false)} />
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
  textIPPW: {
    marginBottom: responsive(28),
    width: responsive(334),
    height: responsive(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewNumberPhone: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: responsive(84),
    height: responsive(50),
    padding: responsive(12),
    borderBottomLeftRadius: responsive(4),
    borderTopLeftRadius: responsive(4),
    backgroundColor: colors.WHITEGREY,
    marginBottom: responsive(3),
  },
  viewInputNumberPhone: {
    width: responsive(250),
    height: responsive(50),
    padding: responsive(12),
    borderBottomRightRadius: responsive(4),
    borderTopRightRadius: responsive(4),
    backgroundColor: colors.WHITEGREY,
    marginBottom: responsive(3),
  },
  viewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive(22),
  },
  txtOption: {
    marginRight: responsive(20),
    ...TextStyles.normalSemiBold,
  },
  txtLogin: {
    marginTop: responsive(50),
    marginBottom: responsive(75),
    color: colors.BLUEBOLD,
    ...TextStyles.heading3,
  },
  txtForgotPW: {
    color: colors.GREEN,
    ...TextStyles.normalSemiBold,
    marginTop: responsive(20),
    marginBottom: responsive(100),
  },
  txtDontAccount: {
    color: colors.GREYBOLD,
    ...TextStyles.normaleRegular,
  },
  txtSignup: {
    marginLeft: responsive(3),
    color: colors.GREEN,
    ...TextStyles.normalSemiBold,
  },
  txtNumber: {
    ...TextStyles.normalSemiBold,
    color: colors.GREY,
    marginLeft: responsive(5),
  },
  txtColumn: { color: colors.GREYSEMI, marginLeft: responsive(5) },
  txtError: {
    marginBottom: responsive(12),
    marginTop: responsive(2),
    marginLeft: responsive(8),
    color: '#B00020',
    ...TextStyles.largeCaption,
  },
  error: {
    color: 'red',
  },
  image: {
    height: responsive(15),
    width: responsive(15),
    marginTop: responsive(60),
  },
  imageCountry: {
    height: responsive(16),
    width: responsive(16),
    marginLeft: responsive(5),
  },
  imageListDown: {
    height: responsive(15),
    width: responsive(12),
    marginLeft: responsive(5),
  },
});
