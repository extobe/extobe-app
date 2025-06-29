import React, { useContext, useState } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { ListCoinContext } from '@contexts/ListCoinProvider';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const Main = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const list = useContext(ListCoinContext);
  const dataRealtime = list?.listCoin !== null ? list?.listCoin : [];

  function truncate(value: number, precision: number) {
    var step = Math.pow(10, precision || 0);
    var temp = Math.trunc(step * value);
    var a = temp / step;
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const formatMoney = (money) => {
    let value = '';
    let dotIndex = money.indexOf('.');
    let length = money.length;
    if (dotIndex !== -1) {
      length = dotIndex;
    }
    for (let index = 1; index <= length; index++) {
      if (index % 3 === 1 && index > 1) {
        value = `${money[length - index]},` + value;
      } else {
        value = money[length - index] + value;
      }
    }
    if (dotIndex !== -1) {
      value = value + money.slice(dotIndex);
    }
    return value;
  };
  const fixedMoney = (money) => {
    return parseFloat(parseFloat(money).toFixed(8));
  };
  const searchListCoin = () => {
    navigate('ListCoinSearch');
  };
  const listCoin = dataRealtime?.map((item: any) => {
    const totalVND = () => {
      let total = '';
      total += item?.price * 23500;
      return total;
    };
    return (
      <View style={styles.viewColumn}>
        <View style={styles.viewRow}>
          <Image
            source={ICONS.iconAvatar}
            style={styles.iconCoin}
            resizeMode="contain"
          />
          <View style={styles.viewName}>
            <Text style={styles.normalBoldBlue}>{item?.name}</Text>
            <Text style={styles.normalRglBlue}>{item?.token_key}</Text>
          </View>
        </View>
        <View style={styles.viewPrice}>
          <Text style={styles.normalBoldBlue}>
            ${formatMoney(String(fixedMoney(item?.price)))}
          </Text>
          <Text style={styles.txtVND}>{truncate(totalVND())} đ</Text>
        </View>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TouchableOpacity onPress={searchListCoin} style={styles.viewSearch}>
          <Image
            source={ICONS.iconSearch}
            style={styles.imageSearch}
            resizeMode="contain"
          />
          <Text style={styles.txtVND}>Search</Text>
        </TouchableOpacity>
        <View style={styles.viewRow}>
          <Image
            source={ICONS.iconUnCheckBoxGreen}
            style={styles.iconUnCheckBoxGreen}
            resizeMode="contain"
          />
          <Text style={styles.normalRglBlue}>Hide 0 Balance Wallets</Text>
        </View>
      </View>
      {listCoin}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsive(50),
    paddingTop: responsive(10),
    paddingHorizontal: responsive(20),
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
  viewSearch: {
    height: responsive(27),
    width: responsive(160),
    backgroundColor: colors.WHITELIGHT,
    borderRadius: responsive(20),
    flexDirection: 'row',
    alignItems: 'center',
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
  viewPrice: {
    marginLeft: responsive(20),
    alignItems: 'flex-end',
  },
  txtInputSearch: {
    height: responsive(33),
    width: responsive(120),
    fontSize: responsive(12),
  },
  normalBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.normalBold,
  },
  txtVND: {
    color: colors.GREYSEMI,
    ...TextStyles.largeCaption,
  },
  normalRglBlue: {
    ...TextStyles.normaleRegular,
    color: colors.BLUETEXT,
  },
  mduSmbBlue: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  iconUnCheckBoxGreen: {
    width: responsive(15),
    height: responsive(16),
    marginRight: responsive(5),
  },
  imageSearch: {
    height: responsive(14.5),
    width: responsive(13),
    marginLeft: responsive(10),
    marginRight: responsive(10),
  },
  iconCoin: {
    width: responsive(25),
    height: responsive(25),
  },
});
