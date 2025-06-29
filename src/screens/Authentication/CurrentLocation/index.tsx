/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootNavigationProp, RootScreenRouteProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const CurrentLocationScreen = ({ route }: Props) => {
  const country = route?.params?.country;

  const { t } = useTranslation();
  const { navigate } = useNavigation<RootNavigationProp>();
  const openRegister = () => {
    navigate('Register');
  };
  const backLogin = () => {
    navigate('Login');
  };
  const selectLanguage = () => {
    navigate('SelectLanguage', { id: 3 });
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity onPress={backLogin}>
          <Image
            source={ICONS.iconBack}
            style={styles.imageBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.view}>
          <Text style={styles.txtLocation}>
            {t('screens:selectCountry.BeforeWeStart')}
          </Text>
        </View>
        <TouchableOpacity onPress={selectLanguage} style={styles.viewLanguage}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                country?.path ? { uri: country?.path } : ICONS?.iconVietNam
              }
              style={styles.imageBack}
              resizeMode="contain"
            />
            <Text style={styles.txtCountry}>
              {country?.country_name ? country?.country_name : 'Viet Nam'}
            </Text>
          </View>
          <Image
            source={ICONS.iconChangeLanguage}
            style={styles.iconChangeLanguage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openRegister}>
          <Image
            source={ICONS.buttonNext}
            style={styles.buttonNext}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsive(250),
  },
  buttonNext: {
    height: responsive(40),
    width: responsive(40),
    marginTop: responsive(240),
    marginLeft: responsive(295),
  },
  viewLanguage: {
    marginTop: responsive(30),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: responsive(334),
    height: responsive(50),
    borderRadius: responsive(5),
    backgroundColor: colors.WHITEGREY,
    paddingHorizontal: responsive(15),
  },
  txtLocation: {
    color: colors.GREYBOLD,
    marginTop: responsive(15),
    ...TextStyles.largeSemiBold,
  },
  txtCountry: {
    color: colors.GREYBOLD,
    marginLeft: responsive(10),
    fontSize: responsive(13),
  },
  imageBack: {
    height: responsive(18),
    width: responsive(18),
  },
  iconChangeLanguage: {
    height: responsive(22),
    width: responsive(25),
  },
});
