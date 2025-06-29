/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect, useContext } from 'react';

import { View, StyleSheet, Image, TextInput } from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { ListCoinContext } from '@contexts/ListCoinProvider';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { getProfile } from '@services/Common';
import { colors, responsive } from '@styles';
import socket from '@utils/socket';

import { ICONS } from '@assets/icons';
import { IMAGES } from '@assets/images';

interface Props {}
export const HeaderHome = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const list = useContext(ListCoinContext);

  const [valueSearch, setValueSearch] = useState<string>('');
  const Setting = async () => {
    navigate('Setting');
  };
  const Notification = async () => {
    navigate('Notification');
  };
  const getAPIProfile = async () => {
    const res = await getProfile();
    if (res) {
      auth?.setProfile?.(res?.data?.data);
    }
  };
  const getListCoin = () => {
    common?.setLoading?.(true);
    socket.on('listCoin', (res) => {
      common?.setLoading?.(false);
      list?.setListCoin?.(res);
    });
  };

  useEffect(() => {
    getListCoin();
    getAPIProfile();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TouchableOpacity onPress={Setting}>
          <Image
            source={ICONS.iconAvatar}
            style={{ height: responsive(20), width: responsive(20) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.viewSearch}>
          <Image
            source={ICONS.iconSearch}
            style={styles.imageSearch}
            resizeMode="contain"
          />
          <TextInput
            placeholder={t('screens:selectCountry.SearchCountry')}
            value={valueSearch}
            onChangeText={(t) => setValueSearch(t)}
            style={styles.txtInputSearch}
            placeholderTextColor={colors.GREYSEMI}
          />
        </View>
        <Image
          source={ICONS.iconQR}
          style={styles.imageQR}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={Notification}>
          <Image
            source={ICONS.iconNotificationBasic}
            style={styles.imageNotifi}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={IMAGES.backgroundHome}
        style={styles.viewBgHome}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: responsive(20),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsive(16),
  },
  viewSearch: {
    height: responsive(28),
    width: responsive(235),
    backgroundColor: colors.WHITE,
    borderRadius: responsive(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsive(13),
    marginRight: responsive(12),
  },
  viewBgHome: {
    height: responsive(142),
    width: responsive(343),
    marginLeft: responsive(16),
    marginTop: responsive(15),
  },
  txtInputSearch: {
    height: responsive(38),
    width: responsive(220),
    fontSize: responsive(12),
  },
  imageSearch: {
    height: responsive(13.5),
    width: responsive(12),
    marginLeft: responsive(6),
    marginRight: responsive(3),
  },
  imageQR: {
    height: responsive(20),
    width: responsive(20),
    marginLeft: responsive(15),
  },
  imageNotifi: {
    height: responsive(20.2),
    width: responsive(19),
    marginLeft: responsive(10),
  },
});
