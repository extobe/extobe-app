/* eslint-disable react/jsx-no-duplicate-props */
import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import ModalOpacity from '@components/Modal/ModalOpacity';
import { MyButton } from '@components/MyButton';

import { RootNavigationProp } from '@navigation/navigator';
import { forgotPassword, forgotPasswordBy12Character } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

import { ICONS } from '@assets/icons';

export type Props = {
  visible: any;
  dismiss: () => void;
};
const ForgotPW: React.FC<Props> = ({ visible, dismiss }) => {
  const { t } = useTranslation();

  const { navigate } = useNavigation<RootNavigationProp>();

  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const [email, setEmail] = useState<string>('');
  const [option, setOption] = useState<number>(0);
  const [confirmWord, setConfirmWord] = useState<string>('');
  const time = Date.now();

  const selectOption = () => {
    if (option === 0) {
      setOption(1);
    } else {
      setOption(0);
    }
  };
  useEffect(() => {
    auth?.setEmail?.(email);
  }, [email]);
  const validateEmailFomat = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const sendMail = async () => {
    if (validateEmailFomat(email)) {
      common?.setLoading?.(true);
      const res = await forgotPassword(email, time);
      common?.setLoading?.(false);

      if (res?.data) {
        if (res?.data?.code === 200) {
          showMess(t('validation:all.SuccessfulImplementation'), 'success');
          dismiss();
          navigate('Verification', { id: 3 });
          common?.setTimeCountDown?.(60);
        }
        if (res?.data?.code === 102) {
          showMess(t('validation:all.EmailDoesNotExist'), 'error');
        }
      }
    } else {
      showMess(t('validation:all.EmailNotFormat'), 'error');
    }
  };
  const forgotBy12Character = async () => {
    common?.setLoading?.(true);
    const res = await forgotPasswordBy12Character(
      confirmWord.split(' ').toString(),
      time,
    );
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 207) {
        auth?.setEmail?.(res?.data?.data?.email);
        showMess(t('validation:all.SuccessfulImplementation'), 'success');
        dismiss();
        common?.setTimeCountDown?.(60);
        navigate('NewPassWord');
      }
      if (res?.data?.code === 112) {
        showMess(t('validation:all.AccountHasBeenLocked'), 'error');
      }
      if (res?.data?.code === 111) {
        showMess(t('validation:twelveWord.IncorrectCharacters'), 'error');
      }
    }
  };
  const validEmail = useMemo(() => {
    return validateEmailFomat(email);
  }, [email]);

  return (
    <View style={styles.container}>
      <ModalOpacity visible={visible} dismiss={dismiss}>
        <View style={styles.modalViews}>
          <View style={styles.view}>
            <View style={styles.view}>
              <TouchableOpacity onPress={selectOption} disabled={option === 0}>
                <Text
                  style={[
                    styles.txtTitle,
                    { color: option ? colors.GREY : colors.GREEN },
                  ]}
                >
                  {t('screens:login.ByEmail')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectOption} disabled={option === 1}>
                <Text
                  style={[
                    styles.txtTitle,
                    { color: !option ? colors.GREY : colors.GREEN },
                  ]}
                >
                  {/* {t('screens:login.ByPhoneNumber')} */}
                  By 12 Character
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableNativeFeedback
              onPress={() => {
                dismiss();
              }}
            >
              <Image
                source={ICONS.iconClose}
                style={styles.iconClose}
                resizeMode="contain"
              />
            </TouchableNativeFeedback>
          </View>
          {option === 0 && (
            <>
              <View style={styles.viewEmails}>
                <TextInput
                  value={email}
                  onChangeText={(val) => setEmail(val)}
                  style={styles.textIP}
                  placeholder={t('screens:login.Email')}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity onPress={sendMail}>
                <View
                  style={
                    validEmail
                      ? {
                          ...styles.viewButtonSendmail,
                          backgroundColor: colors.GREEN,
                          marginLeft: responsive(95),
                        }
                      : {
                          ...styles.viewButtonSendmail,
                          marginLeft: responsive(95),
                        }
                  }
                >
                  {common?.loading === false ? (
                    <Text style={styles.txtButtonREGISTERS}>
                      {' '}
                      {t('screens:all.Submit')}
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color={colors.WHITE} />
                  )}
                </View>
              </TouchableOpacity>
            </>
          )}
          {option === 1 && (
            <View style={{ alignItems: 'center' }}>
              <View style={styles.viewConfirmWord}>
                <TextInput
                  value={confirmWord}
                  onChangeText={(val) => setConfirmWord(val)}
                  style={{ color: 'gray' }}
                  placeholder={t(
                    'validation:twelveWord.PleaseEnterAll12Phrases',
                  )}
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
                  buttonText={t('screens:all.Submit')}
                  textStyle={{ alignItems: 'center' }}
                  onPress={forgotBy12Character}
                  style={{
                    ...styles.viewButtonSendmail,
                    backgroundColor: colors.GREEN,
                    marginTop: responsive(10),
                  }}
                />
              ) : (
                <MyButton
                  buttonText={t('screens:all.Submit')}
                  textStyle={{ alignItems: 'center' }}
                  onPress={() => {
                    showMess(
                      t('validation:twelveWord.PleaseEnterAll12Phrases'),
                      'error',
                    );
                  }}
                  style={{
                    ...styles.viewButtonSendmail,
                    marginTop: responsive(10),
                  }}
                />
              )}
            </View>
          )}
        </View>
      </ModalOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalViews: {
    height: responsive(220),
    left: responsive(14),
    position: 'absolute',
    shadowColor: colors.GREYBOLD,
    shadowOpacity: responsive(0.5),
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: responsive(5),
    borderRadius: responsive(7),
    width: responsive(345),
  },
  viewEmails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive(15),
    height: responsive(45),
    borderRadius: responsive(5),
    borderWidth: 5 * StyleSheet.hairlineWidth,
    borderColor: colors.GREEN,
    marginTop: responsive(10),
    marginLeft: responsive(20),
    width: responsive(305),
  },
  viewButtonSendmail: {
    alignItems: 'center',
    height: responsive(45),
    width: responsive(150),
    borderRadius: responsive(7),
    justifyContent: 'center',
    marginTop: responsive(50),
    backgroundColor: colors.GREYLIGHT,
  },
  styleInput: {
    color: colors.DARK,
    width: responsive(300),
    height: responsive(60),
  },
  viewConfirmWord: {
    borderRadius: responsive(5),
    borderColor: colors.GREEN,
    marginHorizontal: responsive(15),
    height: responsive(80),
    borderWidth: 5 * StyleSheet.hairlineWidth,
    paddingTop: responsive(10),
    paddingLeft: responsive(10),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtButtonREGISTERS: {
    ...TextStyles.mediumBold,
    color: colors.WHITE,
    marginTop: responsive(2),
  },
  txtTitle: {
    ...TextStyles.normalSemiBold,
    color: colors.GREYBOLD,
    marginLeft: responsive(20),
    marginVertical: responsive(10),
  },
  textIP: {
    color: colors.GREYBOLD,
    width: responsive(270),
    height: responsive(50),
  },
  txtTwo: {
    color: colors.GREYBOLD,
    ...TextStyles.normalSemiBold,
    paddingTop: responsive(10),
  },
  iconClose: {
    height: responsive(15),
    width: responsive(15),
    marginRight: responsive(20),
  },
});
export default ForgotPW;
