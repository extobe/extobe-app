import React from 'react';

import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useSocketDetailCoins } from '@hooks/useSocketDetailCoins';
import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const Header = ({}: Props) => {
  const { dataCharts } = useSocketDetailCoins();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  // console.log('====================================');
  // console.log(dataCharts);
  // console.log('====================================');
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
      <View style={styles.viewBack}>
        <TouchableOpacity
          onPress={() => {
            navigate('Trades');
          }}
        >
          <Image
            source={ICONS.iconBack}
            style={styles.iconBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.views}>
          <Image
            source={ICONS.iconSelectList}
            style={{
              height: responsive(17),
              width: responsive(20.5),
              marginHorizontal: responsive(8),
            }}
            resizeMode="contain"
          />
          <Text style={styles.txtName}>BTC</Text>
          <Text style={styles.txtNames}>/USDT</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: responsive(80),
          marginVertical: responsive(10),
        }}
      >
        <View
          style={{
            width: responsive(175),
            height: responsive(80),
            paddingLeft: responsive(20),
          }}
        >
          <Text style={{ ...TextStyles.largeSemiBold, color: colors.GREEN }}>
            {formatMoney(String(fixedMoney2(dataCharts?.close)))}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
            >
              đ {truncate(dataCharts?.close * 23500)}
            </Text>
            <View style={styles.viewPercent}>
              <Text
                style={{ color: colors.GREEN, ...TextStyles.normalSemiBold }}
              >
                {formatMoney(String(fixedMoney2(dataCharts?.percentChange)))}%
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: responsive(100),
            height: responsive(80),
            paddingLeft: responsive(30),
            justifyContent: 'space-around',
          }}
        >
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            24 High
          </Text>
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            24 Low
          </Text>
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            Vol (USDT)
          </Text>
        </View>
        <View
          style={{
            width: responsive(125),
            height: responsive(80),
            justifyContent: 'space-around',
            paddingLeft: responsive(20),
          }}
        >
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            {formatMoney(String(fixedMoney2(dataCharts?.high)))}
          </Text>
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            {' '}
            {formatMoney(String(fixedMoney2(dataCharts?.low)))}
          </Text>
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.GREYBOLD }}
          >
            {' '}
            {formatMoney(String(fixedMoney2(dataCharts?.volume)))}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: responsive(10),
          backgroundColor: colors.WHITELIGHT,
          marginBottom: responsive(10),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  viewBack: {
    height: responsive(50),
    paddingHorizontal: responsive(22),
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    width: responsive(95),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPercent: {
    width: responsive(60),
    height: responsive(23),
    marginLeft: responsive(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsive(5),
    backgroundColor: colors.BLUESKY,
  },
  txtName: {
    color: colors.BLUETEXT,
    ...TextStyles.largeBold,
  },
  txtNames: {
    color: colors.BLUETEXT,
    ...TextStyles.largeRegular,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
    marginRight: responsive(10),
  },
});
