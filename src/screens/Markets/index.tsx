/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';

import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { colors, responsive, TextStyles } from '@styles';

import { TAB_MARKET } from '../../configs';
import { Favarites } from './Favorites';

import { ICONS } from '@assets/icons';

interface Props {}
export const MarketsScreen = ({}: Props) => {
  const { t } = useTranslation();

  const [active, setActive] = useState(0);
  const [valueSearch, setValueSearch] = useState<string>('');

  const data = TAB_MARKET.map((item) => {
    return {
      ...item,
    };
  });

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
  const fixedMoney2 = (money) => {
    return parseFloat(parseFloat(money).toFixed(2));
  };
  function truncate(value: number, precision: number) {
    var step = Math.pow(10, precision || 0);
    var temp = Math.trunc(step * value);
    var a = temp / step;
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          {/* <TouchableOpacity onPress={Setting}> */}
          <Image
            source={ICONS.iconAvatar}
            style={{ height: responsive(20), width: responsive(20) }}
            resizeMode="contain"
          />
          {/* </TouchableOpacity> */}
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
          {/* <TouchableOpacity onPress={Notification}> */}
          <Image
            source={ICONS.iconNotificationBasic}
            style={styles.imageNotifi}
            resizeMode="contain"
          />
          {/* </TouchableOpacity> */}
        </View>
        <FlatList
          data={data}
          keyExtractor={(_, index) => `key-list-history${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setActive(item?.id);
                }}
              >
                <View style={styles.viewTab}>
                  <Text
                    style={
                      active === item?.id
                        ? { ...styles.txtName, color: colors.GREEN }
                        : styles.txtName
                    }
                  >
                    {item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.viewTabs} />
        {active === 0 && (
          <View
            style={{
              paddingHorizontal: responsive(20),
            }}
          >
            <Favarites />
          </View>
        )}
        {active === 1 && <View style={styles.viewAll} />}
        {active === 2 && <View style={styles.viewAll} />}
        {active === 3 && <View style={styles.viewAll} />}
        {active === 4 && <View style={styles.viewAll} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsive(16),
  },
  viewTab: {
    alignItems: 'center',
    height: responsive(40),
    width: responsive(93.75),
    justifyContent: 'center',
    marginVertical: responsive(10),
  },
  viewTabs: {
    height: responsive(10),
    backgroundColor: colors.WHITELIGHT,
    marginBottom: responsive(10),
  },
  viewSearch: {
    height: responsive(28),
    width: responsive(235),
    backgroundColor: colors.WHITELIGHT,
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
  viewAll: {
    marginTop: responsive(20),
    paddingHorizontal: responsive(15),
  },
  txtInputSearch: {
    height: responsive(38),
    width: responsive(220),
    fontSize: responsive(12),
  },
  txtName: {
    color: colors.GREYSEMI,
    ...TextStyles.normalSemiBold,
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
