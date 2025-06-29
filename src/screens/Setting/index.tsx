/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MyButton } from '@components/MyButton';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const SettingScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const auth = useContext(AuthUserContext);
  const Logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('resUser');
    auth?.setAuth?.(!auth?.isAuth);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => {
              navigate('Home');
            }}
          >
            <Image
              source={ICONS.iconBack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* <Image
          source={ICONS.iconDarkTheme}
          style={styles.iconBack}
          resizeMode="contain"
        /> */}
        </View>
        <View style={styles.viewFirst}>
          <Text style={styles.mduBoldBLUE}>{auth?.profile?.email}</Text>
          <View style={styles.viewVerifi}>
            <Text style={styles.txtVerifi}>Unverified</Text>
          </View>
        </View>
        <View style={styles.viewFirst}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.txtUserID}>User ID:</Text>
            <Text style={styles.mduBoldBLUE}> {auth?.profile?.id}</Text>
          </View>
          <Text style={styles.txtORANGE}>VIP 0</Text>
        </View>
        <View style={styles.viewLine} />
        <TouchableOpacity
          onPress={() => {
            navigate('Security');
          }}
          style={styles.viewList}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconSecurity}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Security</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.viewList}>
          <TouchableOpacity
            onPress={() => {
              navigate('Identification');
            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Image
              source={ICONS.iconIndentification}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Identification</Text>
          </TouchableOpacity>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewList}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconReferal}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Referal</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewList}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconRewardCenter}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Reward Center</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewList}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconTaskCenter}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Task Center</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewList}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconAPIManagement}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>API Management</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('SettingSecond');
          }}
          style={styles.viewList}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconAPIManagement}
              style={styles.iconList}
              resizeMode="contain"
            />
            <Text style={styles.mduBoldBLUE}>Setting</Text>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <MyButton
          buttonText={t('screens:login.LogOut')}
          textStyle={{ alignItems: 'center' }}
          onPress={Logout}
          // disabled={!validLogin}
          style={styles.button}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive(15),
  },
  viewFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(22),
    marginTop: responsive(10),
  },
  viewList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(22),
    marginBottom: responsive(30),
  },
  viewVerifi: {
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(4),
    backgroundColor: colors.PINK,
    justifyContent: 'center',
    borderRadius: responsive(5),
  },
  viewLine: {
    backgroundColor: colors.WHITELIGHT,
    height: responsive(8),
    marginVertical: responsive(20),
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(335),
    justifyContent: 'center',
    backgroundColor: colors.GREYLIGHT,
    height: responsive(50),
    marginTop: responsive(60),
    marginHorizontal: responsive(22),
  },
  mduBoldBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumSemiBold,
  },
  txtVerifi: {
    color: colors.ERROR,
    ...TextStyles.normalSemiBold,
  },
  txtUserID: {
    color: colors.GREYSEMI,
    ...TextStyles.mediumRegular,
  },
  txtORANGE: {
    color: colors.ORANGE,
    ...TextStyles.mediumBold,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
  },
  iconList: {
    height: responsive(22),
    width: responsive(22),
    marginRight: responsive(15),
  },
  iconNext: {
    height: responsive(16),
    width: responsive(12),
  },
});
