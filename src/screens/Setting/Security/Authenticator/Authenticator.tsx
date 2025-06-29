/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import Clipboard from '@react-native-community/clipboard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { getProfile } from '@services/Common';
import { create2FA, disable2FA, enable2FA } from '@services/TwoFA';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

import { ICONS } from '@assets/icons';

interface Props {}
export const AuthenticatorScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);

  const refScrollView = useRef();
  useFocusEffect(
    React.useCallback(() => {
      refScrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }, []),
  );

  const flat = auth?.profile?.mfa;
  const [active, setActive] = useState<number>(1);
  const [turnOn2FAB1, setTurnOn2FAB1] = useState<boolean>();
  const [turnOn2FAB2, setTurnOn2FAB2] = useState<boolean>();
  const [turnOn2FAB3, setTurnOn2FAB3] = useState<boolean>();
  const [isTurnOff2FA, setTurnOff2FA] = useState<boolean>();
  const [qrCode, setQRcode] = useState<string>();
  const [otpAuth, setOTPauth] = useState<string>();
  const [OTP, setOTP] = useState<number>();

  const handleAuthenticator = () => {
    if (active === 1) {
      setActive(0);
      setTurnOn2FAB1(false);
      setTurnOn2FAB2(false);
      setTurnOn2FAB3(false);
    } else {
      setActive(1);
    }
  };

  const getQRCode = async () => {
    const res = await create2FA();
    setQRcode(res?.data?.data?.mfacode);
    setOTPauth(res?.data?.data?.otpauth_url);
  };

  useEffect(() => {
    getQRCode();
  }, []);

  const getAPIProfile = async () => {
    const res = await getProfile();
    // console.log('response', res?.data?.data);
    if (res) {
      auth?.setProfile?.(res?.data?.data);
    }
  };
  const turnOn2FA = async () => {
    common?.setLoading?.(true);
    const res = await enable2FA(qrCode, OTP, otpAuth);
    common?.setLoading?.(false);

    if (res?.data?.code === 202) {
      getAPIProfile();
      showMess(t('validation:all.SuccessfulImplementation'), 'success');
      navigate('Security');
    }
    if (res?.data?.code === 111) {
      showMess(t('validation:login.code2FAnotCorrect'), 'error');
    }
  };
  const turnOff2FA = async () => {
    common?.setLoading?.(true);
    const res = await disable2FA(OTP, auth?.profile?.email);
    common?.setLoading?.(false);

    if (res?.data?.code === 201) {
      getAPIProfile();
      showMess(t('validation:all.SuccessfulImplementation'), 'success');
      navigate('Security');
    }
    if (res?.data?.code === 111) {
      showMess(t('validation:login.code2FAnotCorrect'), 'error');
    }
  };
  const handleCopy = () => {
    Clipboard.setString(qrCode);
    showMess(t('validation:all.CopyCodeSuccessful'), 'success');
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView ref={refScrollView} showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: responsive(80) }}>
            <TouchableOpacity onPress={() => handleAuthenticator()}>
              <View
                style={
                  active === 1
                    ? styles.activeFirstBG
                    : {
                        ...styles.activeFirstBG,
                        backgroundColor: colors.WHITELIGHT,
                      }
                }
              >
                <Text
                  style={
                    active === 1
                      ? styles.activeText
                      : {
                          ...styles.activeText,
                          color: colors.GREEN,
                        }
                  }
                >
                  {t('screens:authenticator.title')}
                </Text>
              </View>
            </TouchableOpacity>
            {active === 1 &&
              !turnOn2FAB1 &&
              !turnOn2FAB2 &&
              !turnOn2FAB3 &&
              flat === false && (
                <View style={styles.viewActive}>
                  <Text style={styles.txtMDUrglGB}>
                    {t('screens:authenticator.content')}
                  </Text>
                  <Text style={styles.txtUserGuide}>
                    {t('screens:authenticator.UserGuideGoogleAuthenticator')}
                  </Text>
                  <View style={styles.viewUserGuide}>
                    <Image
                      source={ICONS.iconAuthenticator}
                      style={{ height: responsive(40), width: responsive(40) }}
                      resizeMode="contain"
                    />
                    <View style={{ marginLeft: responsive(10) }}>
                      <Text style={styles.txtMDUsmbGreenB}>
                        {t('screens:all.Confirm')} Authenticator
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.viewButtonDisable}>
                          <Text style={styles.txtNMBoldWhite}>
                            {t('screens:all.Disable')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.viewButtonTurnOn}
                    onPress={() => {
                      setTurnOn2FAB1(true);
                    }}
                  >
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:all.TurnOn')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {!isTurnOff2FA && active === 1 && flat === true && (
              <View style={styles.viewActive}>
                <View style={styles.view}>
                  <Image
                    source={ICONS.iconAuthenticator}
                    style={{ height: responsive(40), width: responsive(40) }}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: responsive(10) }}>
                    <Text style={styles.txtMDUsmbGreenB}>
                      {t('screens:all.Confirm')} Authenticator/Authy
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity style={styles.viewButtonDisable}>
                        <Text style={styles.txtNMBoldWhite}>
                          {t('screens:all.Enable')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.viewButtonTurnOn}
                  onPress={() => {
                    setTurnOff2FA(true);
                  }}
                >
                  <Text style={styles.txtMDUsmbWhite}>
                    {t('screens:all.Disable')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {turnOn2FAB1 && active === 1 && flat === false && (
              <View style={styles.viewActive}>
                <View style={styles.viewActiveSecond}>
                  <Text
                    style={{ ...TextStyles.largeBold, color: colors.WHITE }}
                  >
                    {t('screens:authenticator.GetTheApp')}:{' '}
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:authenticator.Step')} 1/3
                    </Text>
                  </Text>
                  <View
                    style={{ flexDirection: 'row', marginTop: responsive(8) }}
                  >
                    <View style={styles.viewStatus} />
                    <View style={styles.viewStatuss} />
                    <View style={styles.viewStatuss} />
                  </View>
                </View>
                <View style={styles.viewAll}>
                  <View style={styles.viewAlls}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        setTurnOn2FAB1(false);
                      }}
                    >
                      <Image
                        source={ICONS.iconBackSecond}
                        style={{
                          height: responsive(30),
                          width: responsive(30),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.txtBack}>
                        {t('screens:all.Back')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTurnOn2FAB1(false);
                      }}
                    >
                      <View style={styles.viewButtonClose}>
                        <Image
                          source={ICONS.iconClose}
                          style={{
                            height: responsive(20),
                            width: responsive(20),
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txtGetTheApp}>
                    {t('screens:authenticator.GetTheApp')}
                  </Text>
                  <Text style={styles.txtMDUrglWhite}>
                    {t('screens:authenticator.Step')} 1:{' '}
                    <Text style={styles.txtMDUrglWhite}>
                      {t('screens:authenticator.DownloadAndInstall')} {'\n'}
                      Google Authenticator
                    </Text>
                  </Text>
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={ICONS.iconAppleStore}
                      style={styles.iconAppStore}
                      resizeMode="contain"
                    />
                    <Image
                      source={ICONS.iconGooglePlay}
                      style={{ height: responsive(50), width: responsive(150) }}
                      resizeMode="contain"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.viewButtonNext}
                    onPress={() => {
                      setTurnOn2FAB1(false);
                      setTurnOn2FAB2(true);
                    }}
                  >
                    <Text style={styles.txtLsmbWhite}>
                      {t('screens:all.Next')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {turnOn2FAB2 && active === 1 && flat === false && (
              <View style={styles.viewActive}>
                <View style={styles.viewActiveSecond}>
                  <Text style={styles.txtLsmbWhite}>
                    {t('screens:authenticator.ScanCode')} QR:{' '}
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:authenticator.Step')} 2/3
                    </Text>
                  </Text>
                  <View
                    style={{ flexDirection: 'row', marginTop: responsive(8) }}
                  >
                    <View style={styles.viewStatus} />
                    <View style={styles.viewStatus} />
                    <View style={styles.viewStatuss} />
                  </View>
                </View>
                <View style={styles.viewAll}>
                  <View style={styles.viewAlls}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        setTurnOn2FAB2(false);
                        setTurnOn2FAB1(true);
                      }}
                    >
                      <Image
                        source={ICONS.iconBackSecond}
                        style={{
                          height: responsive(30),
                          width: responsive(30),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.txtBack}>
                        {t('screens:all.Back')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTurnOn2FAB2(false);
                      }}
                    >
                      <View style={styles.viewButtonClose}>
                        <Image
                          source={ICONS.iconClose}
                          style={{
                            height: responsive(20),
                            width: responsive(20),
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txtScanCode}>
                    {t('screens:authenticator.ScanCode')} QR
                  </Text>
                  <Text style={styles.txtMDUrglWhite}>
                    {t('screens:authenticator.Step')} 2:{' '}
                    <Text style={styles.txtMDUrglWhite}>
                      {t('screens:authenticator.UseTheAuthenticatorApp')}
                    </Text>
                  </Text>
                  <View style={styles.viewQRcode}>
                    <QRCode
                      value={qrCode}
                      size={160}
                      backgroundColor={colors.WHITE}
                      logoBackgroundColor={colors.WHITE}
                    />
                  </View>
                  <Text style={styles.txtMDUrglWhite}>
                    {t('screens:authenticator.IfYouCannotScanTheQRcode')}
                  </Text>

                  <View style={styles.viewCopy}>
                    <TouchableOpacity
                      onPress={handleCopy}
                      style={styles.viewAlls}
                    >
                      <Text style={styles.txtMDUsmbWhite}>
                        {qrCode.slice(0, 17)}
                      </Text>
                      <View style={styles.viewButtonCopy}>
                        <Text style={styles.txtMDUsmbWhite}>COPY</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.viewButtonNext}
                    onPress={() => {
                      setTurnOn2FAB2(false);
                      setTurnOn2FAB3(true);
                    }}
                  >
                    <Text style={styles.txtLsmbWhite}>
                      {t('screens:all.Next')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {turnOn2FAB3 && active === 1 && flat === false && (
              <View style={styles.viewActive}>
                <View style={styles.viewActiveSecond}>
                  <Text style={styles.txtLsmbWhite}>
                    {t('screens:authenticator.EnterTheSecurityCode')}:{' '}
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:authenticator.Step')} 3/3
                    </Text>
                  </Text>
                  <View
                    style={{ flexDirection: 'row', marginTop: responsive(8) }}
                  >
                    <View style={styles.viewStatus} />
                    <View style={styles.viewStatus} />
                    <View style={styles.viewStatus} />
                  </View>
                </View>
                <View style={styles.viewAll}>
                  <View style={styles.viewAlls}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        setTurnOn2FAB3(false);
                        setTurnOn2FAB2(true);
                      }}
                    >
                      <Image
                        source={ICONS.iconBackSecond}
                        style={{
                          height: responsive(30),
                          width: responsive(30),
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.txtBack}>
                        {t('screens:all.Back')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTurnOn2FAB3(false);
                      }}
                    >
                      <View style={styles.viewButtonClose}>
                        <Image
                          source={ICONS.iconClose}
                          style={{
                            height: responsive(20),
                            width: responsive(20),
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.txtGetTheApp}>
                    {t('screens:authenticator.EnterTheSecurityCode')}
                  </Text>
                  <Text style={styles.txtMDUsmbWhite}>
                    {t('screens:authenticator.Step')} 3:{' '}
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:authenticator.EnterTheCodeDisplayed')}
                    </Text>
                  </Text>

                  <View style={styles.viewCopy}>
                    <TextInput
                      onChangeText={(val) => setOTP(val)}
                      autoCapitalize="none"
                      style={styles.txtTextIP}
                      placeholderTextColor={colors.WHITE}
                      placeholder={t('screens:authenticator.EnterCode')}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                  {OTP?.toString().length === 6 ? (
                    <TouchableOpacity
                      onPress={turnOn2FA}
                      style={styles.viewButtonNext}
                    >
                      <Text style={styles.txtLsmbWhite}>
                        {t('screens:all.TurnOn')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        showMess(
                          t('validation:authenticator.PleaseCompleteOTPCode'),
                          'error',
                        );
                      }}
                      style={
                        OTP?.toString().length === 6
                          ? styles.viewButtonNext
                          : {
                              ...styles.viewButtonNext,
                              backgroundColor: '#BABABB',
                            }
                      }
                    >
                      <Text style={styles.txtLsmbWhite}>
                        {t('screens:all.TurnOn')}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            {isTurnOff2FA && active === 1 && flat === true && (
              <View style={styles.viewActive}>
                <View style={styles.viewAll}>
                  <Text style={styles.txtMDUsmbWhite}>
                    {t('screens:authenticator.EnterAuthCode')}
                  </Text>
                  <View style={styles.viewCopy}>
                    <TextInput
                      onChangeText={(val) => setOTP(val)}
                      autoCapitalize="none"
                      style={styles.txtTextIP}
                      placeholderTextColor={colors.WHITE}
                      placeholder={t('screens:authenticator.EnterCode')}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>

                  <View
                    style={{ flexDirection: 'row', marginTop: responsive(25) }}
                  >
                    <TouchableOpacity onPress={turnOff2FA}>
                      <View style={styles.viewTurnOff}>
                        <Text style={styles.txtMDUrglGB}>
                          {t('screens:all.TurnOff')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTurnOff2FA(false);
                      }}
                    >
                      <View
                        style={[
                          styles.viewTurnOff,
                          { backgroundColor: colors.GREYLIGHT },
                        ]}
                      >
                        <Text style={styles.txtMDUrglWhite}>
                          {t('screens:all.Cancel')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.viewForgotPW}>
                    <Text style={styles.txtMDUsmbWhite}>
                      {t('screens:authenticator.ForgotAuthenticator')}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  activeFirstBG: {
    paddingVertical: responsive(18),
    marginHorizontal: responsive(15),
    paddingHorizontal: responsive(10),
    marginBottom: responsive(20),
    backgroundColor: colors.GREEN,
    marginTop: responsive(30),
  },
  viewActive: {
    paddingVertical: responsive(25),
    marginHorizontal: responsive(15),
    paddingHorizontal: responsive(30),
    marginTop: responsive(10),
    flex: 1,
    backgroundColor: colors.WHITEGREY,
    marginBottom: responsive(5),
  },
  activeText: {
    ...TextStyles.mediumBold,
    color: colors.WHITE,
  },
  viewStatus: {
    backgroundColor: colors.GREEN,
    height: responsive(10),
    width: responsive(45),
    borderRadius: responsive(7),
    marginRight: responsive(5),
  },
  viewStatuss: {
    backgroundColor: colors.GREYSEMI,
    height: responsive(10),
    width: responsive(45),
    borderRadius: responsive(7),
    marginRight: responsive(5),
  },
  viewUserGuide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(10),
  },
  viewButtonDisable: {
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(5),
    backgroundColor: colors.GREYSEMI,
    marginTop: responsive(10),
    borderRadius: responsive(4),
  },
  viewButtonTurnOn: {
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(5),
    width: responsive(120),
    height: responsive(45),
    alignItems: 'center',
    backgroundColor: colors.GREEN,
    marginTop: responsive(10),
    borderRadius: responsive(4),
    justifyContent: 'center',
  },
  viewActiveSecond: {
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(5),
    height: responsive(70),
    alignItems: 'center',
    backgroundColor: '#BABABB',
    marginTop: responsive(10),
    justifyContent: 'center',
  },
  viewCopy: {
    height: responsive(55),
    borderColor: colors.WHITELIGHT,
    justifyContent: 'center',
    paddingLeft: responsive(10),
    borderRadius: responsive(5),
    marginTop: responsive(20),
    borderWidth: 2 * StyleSheet.hairlineWidth,
    paddingRight: responsive(3),
  },
  viewAll: {
    paddingHorizontal: responsive(20),
    backgroundColor: 'gray',
    paddingVertical: responsive(20),
  },
  viewAlls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(10),
  },
  viewButtonClose: {
    height: responsive(27),
    width: responsive(27),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITELIGHT,
  },
  viewButtonNext: {
    height: responsive(50),
    backgroundColor: colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(5),
    marginTop: responsive(20),
  },
  viewButtonCopy: {
    height: responsive(48),
    backgroundColor: '#BABABB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(5),
    width: responsive(65),
  },
  viewQRcode: {
    alignItems: 'center',
    paddingVertical: responsive(10),
    borderColor: colors.WHITELIGHT,
    justifyContent: 'center',
    borderWidth: 4 * StyleSheet.hairlineWidth,
    marginVertical: responsive(20),
    width: responsive(200),
    marginLeft: responsive(40),
  },
  viewTurnOff: {
    paddingVertical: responsive(5),
    backgroundColor: colors.WHITELIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(5),
    paddingHorizontal: responsive(12),
    marginRight: responsive(8),
  },
  viewForgotPW: {
    marginTop: responsive(15),
    backgroundColor: colors.BLUETEXT,
    justifyContent: 'center',
    height: responsive(40),
    alignItems: 'center',
    borderRadius: responsive(5),
    width: responsive(220),
    marginRight: responsive(8),
  },
  txtTextIP: {
    color: colors.WHITE,
    marginLeft: responsive(10),
    height: responsive(50),
  },
  txtMDUrglGB: {
    ...TextStyles.mediumRegular,
    color: colors.GREYBOLD,
  },
  txtUserGuide: {
    ...TextStyles.mediumSemiBold,
    color: colors.GREENBOLD,
    marginTop: responsive(10),
  },
  txtMDUsmbGreenB: {
    ...TextStyles.mediumSemiBold,
    color: colors.GREENBOLD,
  },
  txtMDUsmbWhite: {
    ...TextStyles.mediumSemiBold,
    color: colors.WHITE,
  },
  txtMDUrglWhite: {
    ...TextStyles.mediumRegular,
    color: colors.WHITE,
  },
  txtLsmbWhite: {
    ...TextStyles.largeSemiBold,
    color: colors.WHITE,
  },
  txtNMBoldWhite: {
    ...TextStyles.normalBold,
    color: colors.WHITE,
  },
  txtBack: {
    ...TextStyles.mediumRegular,
    color: colors.WHITE,
    marginLeft: responsive(5),
  },
  txtGetTheApp: {
    ...TextStyles.heading4,
    color: colors.WHITE,
    marginVertical: responsive(12),
  },
  txtScanCode: {
    ...TextStyles.heading4,
    color: colors.WHITE,
    marginVertical: responsive(12),
  },
  iconAppStore: {
    height: responsive(50),
    width: responsive(150),
    marginVertical: responsive(15),
  },
});
