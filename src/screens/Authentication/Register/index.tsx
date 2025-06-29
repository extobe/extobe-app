/* eslint-disable react/jsx-no-duplicate-props */

/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useContext, // useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootNavigationProp, RootScreenRouteProp } from '@navigation/navigator';
import { register } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

import { MyButton } from '../../../components/MyButton';
import { MyTextInput } from '../../../components/MyTextInput';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const RegisterScreen = ({ route }: Props) => {
  const country = route?.params?.country;

  const { t } = useTranslation();
  const { navigate } = useNavigation<RootNavigationProp>();

  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);

  const [email, setEmail] = useState<string>('');
  const [numberPhone, setNumberPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [referral, setReferral] = useState<string>(null);
  const [errorEmail, setErrorEmail] = useState<string>();
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorNumberPhone, setErrorNumberPhone] = useState<string>();
  const [confirmTerm, setConfirmTerm] = useState<boolean>(false);
  const [flatConfirm, setFlatConfirm] = useState<boolean>(false);
  const time = Date.now();

  const openSelectLanguage = () => {
    navigate('SelectLanguage', { id: 2 });
  };

  const handleConfirmTerm = () => {
    if (confirmTerm) {
      setConfirmTerm(false);
    } else {
      setConfirmTerm(true);
      setFlatConfirm(false);
    }
  };
  const openLogin = () => {
    navigate('Login');
  };

  useEffect(() => {
    auth?.setEmail?.(email);
  }, [email]);

  const isValidField = useCallback((value?: string) => {
    if (value && value.length > 0) {
      return true;
    }
  }, []);
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
      setErrorEmail(t('validation:register.YouMustEnterEmail'));
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
      setErrorPassword(t('validation:register.YouMustEnterPassword'));
      return false;
    }
  }, [password, isValidField]);

  const validateNumberPhone = useCallback(() => {
    if (isValidField(numberPhone)) {
      setErrorNumberPhone(undefined);
    } else {
      setErrorNumberPhone(t('validation:register.YouMustEnterNumberPhone'));
    }
  }, [numberPhone, isValidField]);
  const validateRegister = useCallback(() => {
    validateEmail();
    validatePassword();
    validateNumberPhone();
    if (confirmTerm) {
      setFlatConfirm(false);
    } else {
      setFlatConfirm(true);
    }
  }, [
    validateEmail,
    validatePassword,
    validateNumberPhone,
    email,
    password,
    numberPhone,
    confirmTerm,
  ]);

  const validRegister = useMemo(() => {
    return (
      isValidField(email) &&
      isValidField(password) &&
      isValidField(numberPhone) &&
      validateEmailFomat(email) &&
      confirmTerm
    );
  }, [password, email, numberPhone, confirmTerm, isValidField]);

  const Submit = async () => {
    const phone = country
      ? country?.phone_code?.concat(numberPhone)
      : `84${numberPhone}`;

    common?.setLoading?.(true);
    const res = await register(email, password, phone, referral, time);
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 200) {
        common?.setTimeCountDown?.(60);
        navigate('Verification', { id: 1 });
        showMess(t('validation:login.YouMustEnterCodeMail'), 'success');
      }
      if (res?.data?.code === 107) {
        showMess(t('validation:register.EmailAlreadyExists'), 'error');
      }
      if (res?.data?.code === 103) {
        showMess(t('validation:register.PhoneAlreadyExists'), 'error');
      }
      if (res?.data?.code === 101) {
        showMess(t('validation:register.InvalidPhoneNumber'), 'error');
      }
    }
  };
  const SubmitRegister = () => {
    if (validRegister) {
      Submit();
    } else {
      validateRegister();
    }
  };
  const convertNumberphoneInput = (value: string) => {
    let value1 = '';
    let character = value.indexOf('0');
    for (let index = 0; index < value.length; index++) {
      if (value[index].match(/[0-9]/)) {
        value1 += value[index];
      }
      if (index === 0 && index === character) {
        value1 = value1.substring(1);
      }
    }
    setNumberPhone(value1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.txtSignup}>{t('screens:register.SignUp')}</Text>
        <MyTextInput
          error={errorEmail}
          value={email}
          onChangeText={(val) => setEmail(val)}
          onBlur={validateEmail}
          label={t('screens:register.Email')}
          style={styles.textField}
          autoCapitalize="none"
        />
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
            onChangeText={convertNumberphoneInput}
            onBlur={validateNumberPhone}
            style={styles.viewInputNumberPhone}
            placeholder={t('screens:login.EnterYourPhoneNumber')}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.txtError}>{errorNumberPhone}</Text>
        <MyTextInput
          value={password}
          onChangeText={(val) => setPassword(val)}
          error={errorPassword}
          secureTextEntry
          onBlur={validatePassword}
          label={t('screens:register.Password')}
          style={styles.textField}
          showPW
          autoCapitalize="none"
        />
        <MyTextInput
          value={referral}
          onChangeText={(val) => setReferral(val)}
          secureTextEntry
          label="Referral ID"
          style={styles.textField}
        />
        <View style={styles.viewConfirm}>
          <TouchableOpacity onPress={handleConfirmTerm}>
            <Image
              source={
                !confirmTerm ? ICONS.iconCheckbox : ICONS.iconCheckboxActive
              }
              style={styles.imageConfirm}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txtDontAccount}>
            {t('screens:register.IagreeTo')} ExTobe’s
          </Text>
          <TouchableOpacity>
            <Text style={styles.txtLogin}>
              {t('screens:register.TermOfUse')}
            </Text>
          </TouchableOpacity>
        </View>
        {flatConfirm && (
          <Text style={styles.txtErrorConfirm}>
            {t('validation:register.PleaseAcceptTheTermsOfUse')}!
          </Text>
        )}

        <MyButton
          buttonText={t('screens:register.SignUp')}
          textStyle={{ alignItems: 'center' }}
          onPress={SubmitRegister}
          // disabled={!validLogin}
          style={
            validRegister
              ? { ...styles.button, backgroundColor: colors.GREEN }
              : styles.button
          }
        />
        <View style={styles.viewRow}>
          <Text style={styles.txtDontAccount}>
            {t('screens:register.AlreadyAccount')}
          </Text>
          <TouchableOpacity onPress={openLogin}>
            <Text style={styles.txtLogin}>{t('screens:register.LogIn')}</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: responsive(30),
  },
  textField: {
    marginBottom: responsive(30),
    width: responsive(334),
    height: responsive(50),
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
  },
  viewInputNumberPhone: {
    width: responsive(250),
    height: responsive(50),
    padding: responsive(12),
    borderBottomRightRadius: responsive(4),
    borderTopRightRadius: responsive(4),
    backgroundColor: colors.WHITEGREY,
  },
  viewConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(10),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(70),
  },
  txtSignup: {
    marginTop: responsive(120),
    marginBottom: responsive(50),
    color: colors.BLUEBOLD,
    ...TextStyles.heading3,
  },
  txtDontAccount: {
    color: colors.GREYBOLD,
    ...TextStyles.normaleRegular,
  },
  txtLogin: {
    marginLeft: responsive(3),
    color: colors.GREEN,
    ...TextStyles.normalSemiBold,
  },
  txtNumber: {
    color: colors.GREYSEMI,
    marginLeft: responsive(5),
    ...TextStyles.normalSemiBold,
  },
  txtColumn: { color: colors.GREYSEMI, marginHorizontal: responsive(5) },
  imageConfirm: {
    height: responsive(14.5),
    width: responsive(13),
    marginRight: responsive(7),
  },
  txtError: {
    marginBottom: responsive(12),
    marginTop: responsive(2),
    marginLeft: responsive(8),
    color: '#B00020',
    ...TextStyles.largeCaption,
  },
  txtErrorConfirm: {
    marginBottom: responsive(5),
    marginTop: responsive(2),
    color: '#B00020',
    ...TextStyles.largeCaption,
  },
  error: {
    color: 'red',
  },
  imageCountry: {
    height: responsive(16),
    width: responsive(16),
    marginLeft: responsive(8),
  },
  imageListDown: {
    height: responsive(15),
    width: responsive(12),
    marginLeft: responsive(5),
  },
});
