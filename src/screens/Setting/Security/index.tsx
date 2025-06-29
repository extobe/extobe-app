/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const SecurityScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const profile = useContext(AuthUserContext);
  const refScrollView = useRef();
  useFocusEffect(
    React.useCallback(() => {
      refScrollView.current.scrollTo({ x: 0, y: 0, animated: true });
    }, []),
  );
  const character = profile?.profile?.character_code;
  const mfa = profile?.profile?.mfa;
  return (
    <View style={styles.container}>
      <ScrollView ref={refScrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigate('Setting');
              }}
            >
              <Image
                source={ICONS.iconBack}
                style={styles.iconBack}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.mduBoldBLUE}>Security</Text>
          </View>
        </View>
        <View style={styles.views}>
          <Image
            source={ICONS.iconCircle}
            style={styles.iconCircle}
            resizeMode="contain"
          />
          <Text style={styles.txtFirst}>Two-Factor Authentication (2FA)</Text>
        </View>
        <View style={styles.views}>
          <Image
            source={ICONS.iconCircle}
            style={styles.iconCircle}
            resizeMode="contain"
          />
          <Text style={styles.txtFirst}>Identity Verification</Text>
        </View>
        <View style={styles.views}>
          <Image
            source={ICONS.iconCircle}
            style={styles.iconCircle}
            resizeMode="contain"
          />
          <Text style={styles.txtFirst}>Anti-Phishing Code </Text>
        </View>
        <View style={styles.views}>
          <Image
            source={ICONS.iconCircle}
            style={styles.iconCircle}
            resizeMode="contain"
          />
          <Text style={styles.txtFirst}>Withdrawal Whitelist</Text>
        </View>
        <View style={styles.viewLine} />
        <View style={{ marginLeft: responsive(22) }}>
          <Text style={styles.txtTwoFactor}>
            Two-Factor Authentication (2FA)
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.viewWrapper}>
              <View style={{ height: responsive(160) }}>
                <Text style={styles.txtTitle}>Security Key</Text>
                <Text style={styles.txtContent}>
                  Protect your account with a security key (e.g. Yubikey).
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigate('TwelveWord');
                }}
                style={styles.viewEnable}
              >
                <Text style={styles.txtMDUwhite}>
                  {character === false
                    ? t('screens:all.Enable')
                    : t('screens:all.Disable')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewWrapper}>
              <View style={{ height: responsive(160) }}>
                <Text style={styles.txtTitle}>
                  Google Authenticator (Recommended)
                </Text>
                <Text style={styles.txtContent}>
                  Protect your account and transactions.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigate('Authenticator');
                }}
                style={styles.viewEnable}
              >
                <Text style={styles.txtMDUwhite}>
                  {mfa === false
                    ? t('screens:all.Enable')
                    : t('screens:all.Disable')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: responsive(22) }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.viewWrapper}>
              <View style={{ height: responsive(160) }}>
                <Text style={styles.txtTitle}>Phone Number Verification</Text>
                <Text style={styles.txtContent}>
                  Protect your account and transactions.
                </Text>
              </View>
              <TouchableOpacity
                // onPress={() => {
                //   navigate('TwelveWord');
                // }}
                style={styles.viewEnable}
              >
                <Text style={styles.txtMDUwhite}>Enable</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewWrapper}>
              <View style={{ height: responsive(160) }}>
                <Text style={styles.txtTitle}>Email Address Verification</Text>
                <Text style={styles.txtContent}>
                  Protect your account and transactions.
                </Text>
              </View>
              <TouchableOpacity
                // onPress={() => {
                //   navigate('TwelveWord');
                // }}
                style={styles.viewEnable}
              >
                <Text style={styles.txtMDUwhite}>Enable</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  viewBack: {
    height: responsive(50),
    paddingHorizontal: responsive(22),
    backgroundColor: colors.WHITELIGHT,
    justifyContent: 'center',
    marginBottom: responsive(15),
  },
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsive(30),
    marginVertical: responsive(8),
  },
  viewEnable: {
    width: responsive(95),
    paddingVertical: responsive(4),
    backgroundColor: colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(5),
  },
  viewWrapper: {
    paddingHorizontal: responsive(22),
    backgroundColor: colors.WHITELIGHT,
    paddingVertical: responsive(15),
    marginRight: responsive(14),
    width: responsive(161.5),
    marginBottom: responsive(25),
  },
  viewLine: {
    backgroundColor: colors.WHITELIGHT,
    marginVertical: responsive(12),
    height: responsive(6),
    marginTop: responsive(5),
  },
  txtFirst: {
    ...TextStyles.mediumRegular,
    color: colors.BLUETEXT,
  },
  txtTwoFactor: {
    ...TextStyles.largeSemiBold,
    color: colors.BLUETEXT,
    marginBottom: responsive(20),
  },
  txtTitle: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
    marginBottom: responsive(5),
  },
  txtContent: {
    ...TextStyles.mediumRegular,
    color: colors.BLUETEXT,
    marginBottom: responsive(30),
  },
  mduBoldBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.largeBold,
  },
  txtMDUwhite: {
    color: colors.WHITE,
    ...TextStyles.mediumSemiBold,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
    marginRight: responsive(15),
  },
  iconCircle: {
    height: responsive(10),
    width: responsive(10),
    marginRight: responsive(15),
  },
});
