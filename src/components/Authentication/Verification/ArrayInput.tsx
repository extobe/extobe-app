/* eslint-disable no-undef */

/* eslint-disable react-native/no-inline-styles */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from 'react';

import { StyleSheet, View, TextInput } from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ResendMail from '@screens/Authentication/Login/ResendMail';

import { MyButton } from '@components/MyButton';

import { RootNavigationProp } from '@navigation/navigator';
import { registerVerify, Verify } from '@services/Auth';
import { colors, responsive } from '@styles';
import { showMess } from '@utils/Helper';

const inputs = Array(6).fill(0);
let newInputIndex = 0;

export type Props = {
  time: number;
  idFlatVerifi: number;
};
const ArrayInput: React.FC<Props> = ({ time, idFlatVerifi }) => {
  const { t } = useTranslation();

  const { navigate } = useNavigation<RootNavigationProp>();
  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const [OTP, setOtp] = useState({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [nextIPindex, setNextIPindex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const timeNow = Date.now();
  const input = useRef();

  const HandleChangeText = (text: number, index: number) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    setOtp(newOTP);

    const lastIndex = inputs.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
      setNextIPindex(newInputIndex);
    } else {
      newInputIndex = index === lastIndex ? lastIndex : index + 1;
      setNextIPindex(newInputIndex);
    }
  };
  useEffect(() => {
    input.current.focus();
  }, [nextIPindex]);

  useEffect(() => {
    if (valueOTP().length === 6) {
      submitOTP();
    }
  }, [OTP]);

  const valueOTP = () => {
    let val = '';
    Object.values(OTP).forEach((v) => {
      val += v;
    });
    return val;
  };
  const validOTP = () => {
    if (valueOTP().length !== 6) {
      return false;
    } else {
      return true;
    }
  };

  const submitAPIOTP = async () => {
    common?.setLoading?.(true);

    const res =
      idFlatVerifi === 1
        ? await registerVerify(auth?.email, valueOTP(), timeNow)
        : await Verify(auth?.email, valueOTP(), timeNow);

    common?.setLoading?.(false);

    if (res?.data) {
      if (idFlatVerifi === 2 && res?.data?.code === 200) {
        AsyncStorage.setItem('token', res?.data?.message);
        // AsyncStorage.setItem('profile', response?.data);
        auth?.setAuth?.(!auth?.isAuth);
        showMess(t('validation:login.LoginSuccess'), 'success');
      }
      if (idFlatVerifi === 1 && res?.data?.code === 200) {
        showMess(t('validation:all.SuccessfulImplementation'), 'success');
        common?.setTimeCountDown?.(60);
        navigate('Login');
      }
      if (idFlatVerifi === 3 && res?.data?.code === 200) {
        showMess(t('validation:all.SuccessfulImplementation'), 'success');
        common?.setTimeCountDown?.(60);
        navigate('NewPassWord');
      }
      if (res?.data?.code === 105) {
        showMess(t('validation:all.OTPCodeIsNotCorrect'), 'error');
      }
      if (res?.data?.code === 112) {
        showMess(t('validation:all.AccountHasBeenLocked'), 'error');
      }
      if (res?.data?.code === 104) {
        showMess(t('validation:all.OTPWasExpired'), 'error');
      }
    }
  };
  const submitOTP = () => {
    if (validOTP()) {
      submitAPIOTP();
    } else {
      if (time <= 0) {
        setVisible(true);
      } else {
        showMess(t('validation:login.TheValidityPeriodHasNotExpired'), 'error');
      }
    }
  };

  function renderInputs() {
    return inputs.map((inp, index) => {
      return (
        <TextInput
          style={
            index === nextIPindex
              ? styles.inputFieldsFocused
              : styles.inputFields
          }
          // key={index.toString()}
          keyboardType={'numeric'}
          placeholder={'0'}
          maxLength={1}
          value={OTP[index]}
          ref={nextIPindex === index ? input : null}
          onChangeText={(text) => HandleChangeText(text, index)}
        />
      );
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <>{renderInputs()}</>
      </View>
      <MyButton
        buttonText={
          validOTP()
            ? `${t('screens:all.Submit')} OTP`
            : `${t('screens:all.Resend')} OTP`
        }
        textStyle={{ alignItems: 'center' }}
        onPress={submitOTP}
        style={
          validOTP()
            ? { ...styles.button, backgroundColor: colors.GREEN }
            : styles.button
        }
      />
      <ResendMail visible={visible} dismiss={() => setVisible(false)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsive(20),
    marginTop: responsive(250),
  },
  inputFieldsFocused: {
    height: responsive(40),
    width: responsive(35),
    borderColor: colors.GREEN,
    borderWidth: responsive(2),
    borderRadius: responsive(5),
    backgroundColor: colors.WHITEGREY,
    textAlign: 'center',
  },
  inputFields: {
    height: responsive(40),
    width: responsive(35),
    backgroundColor: colors.WHITEGREY,
    borderRadius: responsive(5),
    textAlign: 'center',
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(295),
    justifyContent: 'center',
    backgroundColor: colors.GREYLIGHT,
    height: responsive(50),
    marginTop: responsive(40),
  },
});
export default ArrayInput;
