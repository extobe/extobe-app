/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext, useRef, useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';

import { ListCoinContext } from '@contexts/ListCoinProvider';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { createFilter } from 'react-native-search-filter';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const ListCoinSearch = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const [valueSearch, setValueSearch] = useState<string>('');
  const [flat, setFlat] = useState<boolean>(true);
  const [marginLeft, setMarginLeft] = useState<boolean>(false);

  const list = useContext(ListCoinContext);
  const dataRealtime = list?.listCoin !== null ? list?.listCoin : [];

  const back = () => {
    navigate('Wallets');
  };
  const selectCoin = (item: Object) => {
    navigate('DetailCoin', { data: item });
  };

  const translateX = useRef(new Animated.Value(0)).current;
  const chosseBuy = (type: number) => {
    setMarginLeft(true);
    Animated.timing(translateX, {
      toValue: responsive(type),
      duration: 200,
      useNativeDriver: true,
    }).start();
    if (flat === false) {
      setFlat(true);
      return flat;
    } else {
      setFlat(false);
      return flat;
    }
  };
  const dataSearch = dataRealtime.filter(
    createFilter(valueSearch, ['name', 'token_key']),
  );
  const listCoin = dataSearch?.map((item: any) => {
    return (
      <View style={styles.viewColumn}>
        <TouchableOpacity
          onPress={() => selectCoin(item)}
          style={styles.viewRow}
        >
          <Image
            source={ICONS.iconAvatar}
            style={styles.iconCoin}
            resizeMode="contain"
          />
          <View style={styles.viewName}>
            <Text style={styles.normalBoldBlue}>{item?.name}</Text>
            <Text style={styles.normalRglBlue}>{item?.token_key}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.view}>
          <View style={styles.viewSearch}>
            <Image
              source={ICONS.iconSearch}
              style={styles.imageSearch}
              resizeMode="contain"
            />
            <TextInput
              placeholder={'Search'}
              value={valueSearch}
              onChangeText={(t) => setValueSearch(t)}
              style={styles.txtInputSearch}
              placeholderTextColor={colors.GREYSEMI}
            />
          </View>
          <TouchableOpacity onPress={back}>
            <Text style={styles.txtCancel}>{t('screens:all.Cancel')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewBuySell}>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(20);
            }}
            disabled={flat}
          >
            <View style={styles.viewAlignItem}>
              <Text
                style={
                  flat === true
                    ? { ...styles.txtBuySell, color: colors.GREEN }
                    : styles.txtBuySell
                }
              >
                Crypto
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(110);
            }}
            disabled={!flat}
          >
            <View style={styles.viewAlignItem}>
              <Text
                style={
                  !flat
                    ? { ...styles.txtBuySell, color: colors.GREEN }
                    : styles.txtBuySell
                }
              >
                Fiat
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              height: 5 * StyleSheet.hairlineWidth,
              backgroundColor: colors.GREYLIGHT,
            }}
          />
          <Animated.View
            style={
              flat && !marginLeft
                ? {
                    ...styles.viewActiveLine,
                    marginLeft: responsive(20),
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
                : !flat && !marginLeft
                ? {
                    ...styles.viewActiveLine,
                    marginLeft: responsive(65),
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
                : {
                    ...styles.viewActiveLine,
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
            }
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {flat && <View style={styles.viewListCoin}>{listCoin}</View>}
        </ScrollView>
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
  viewSearch: {
    height: responsive(32),
    width: responsive(280),
    backgroundColor: colors.WHITEGREY,
    borderRadius: responsive(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewActiveLine: {
    position: 'absolute',
    height: 15 * StyleSheet.hairlineWidth,
    width: responsive(90),
    backgroundColor: colors.GREEN,
    borderRadius: responsive(100),
    bottom: -0.9,
  },
  viewListCoin: {
    marginBottom: responsive(100),
    marginTop: responsive(15),
  },
  viewAlignItem: {
    alignItems: 'center',
    width: responsive(90),
  },
  viewBuySell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive(10),
    marginLeft: responsive(20),
  },
  txtBuySell: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  txtInputSearch: {
    height: responsive(37),
    width: responsive(220),
  },
  txtCancel: {
    color: colors.GREEN,
    marginLeft: responsive(10),
    ...TextStyles.normalSemiBold,
  },
  txtLocation: {
    color: colors.BLUETEXT,
    marginTop: responsive(15),
    ...TextStyles.normalSemiBold,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive(5),
  },
  viewColumn: {
    flexDirection: 'row',
    paddingBottom: responsive(15),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewName: {
    marginLeft: responsive(20),
  },
  normalBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.normalBold,
  },
  normalRglBlue: {
    ...TextStyles.normaleRegular,
    color: colors.BLUETEXT,
  },
  imageSearch: {
    height: responsive(14.5),
    width: responsive(13),
    marginLeft: responsive(10),
    marginRight: responsive(5),
  },
  iconCoin: {
    width: responsive(25),
    height: responsive(25),
  },
});
