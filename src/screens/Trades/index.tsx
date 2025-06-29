import React, { useEffect, useRef, useState } from 'react';

import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';

import { useSocket } from '@hooks/useSocket';
import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { TAB_TRADE } from '../../configs';
import { ExchangeBuySell } from './Spot';

import { ICONS } from '@assets/icons';

interface Props {}
export const TradesScreen = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const [active, setActive] = useState(0);
  const data = TAB_TRADE.map((item) => {
    return {
      ...item,
    };
  });
  const translateX = useRef(new Animated.Value(0)).current;

  const handleSlide = (type: number) => {
    Animated.timing(translateX, {
      toValue: type,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
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
  const openCharts = () => {
    navigate('DetailsChart');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => `key-list-history${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setActive(item?.id);
                    handleSlide(responsive(75) * item?.id);
                  }}
                >
                  <View style={styles.activeBG}>
                    <Text style={styles.txtTab}>{item?.title}</Text>
                  </View>
                  <View style={styles.activeLine} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <Animated.View
          style={{
            ...styles.viewActive,
            transform: [
              {
                translateX,
              },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.viewActiveLine,
            transform: [
              {
                translateX,
              },
            ],
          }}
        />
        <View style={styles.views}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconSelectList}
              style={{
                height: responsive(17),
                width: responsive(20.5),
                marginRight: responsive(8),
              }}
              resizeMode="contain"
            />
            <Text style={styles.txtName}>BTC</Text>
            <Text style={styles.txtNames}>/USDT</Text>
            <View style={styles.viewPercent}>
              <Text
                style={{
                  color: colors.GREEN,
                  ...TextStyles.largeCaptionSemiBold,
                }}
              >
                {formatMoney(String(fixedMoney2(1223)))}%
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={openCharts}>
              <Image
                source={ICONS.iconCharts}
                style={{
                  height: responsive(20),
                  width: responsive(20),
                  marginRight: responsive(15),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              source={ICONS.iconFeature}
              style={{
                height: responsive(5),
                width: responsive(20),
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{
            height: responsive(10),
            backgroundColor: colors.WHITELIGHT,
            marginBottom: responsive(10),
          }}
        />
        {active === 0 && (
          <View
            style={{
              marginTop: responsive(20),
              paddingHorizontal: responsive(15),
            }}
          />
        )}
        {active === 1 && (
          <View
            style={{
              marginTop: responsive(20),
              paddingHorizontal: responsive(15),
            }}
          >
            <ExchangeBuySell />
          </View>
        )}
        {active === 2 && (
          <View
            style={{
              marginTop: responsive(20),
              paddingHorizontal: responsive(15),
            }}
          />
        )}
        {active === 3 && (
          <View
            style={{
              marginTop: responsive(20),
              paddingHorizontal: responsive(15),
            }}
          />
        )}
        {active === 4 && (
          <View
            style={{
              marginTop: responsive(20),
              paddingHorizontal: responsive(15),
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activeBG: {
    alignItems: 'center',
    height: responsive(40),
    width: responsive(75),
    justifyContent: 'center',
  },
  activeLine: {
    backgroundColor: colors.WHITELIGHT,
    height: 6 * StyleSheet.hairlineWidth,
    width: responsive(75),
  },
  viewActive: {
    position: 'absolute',
    zIndex: -10,
    height: responsive(40),
    width: responsive(75),
    backgroundColor: colors.WHITEGREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewActiveLine: {
    position: 'absolute',
    top: responsive(40),
    backgroundColor: colors.GREENBOLD,
    height: 6 * StyleSheet.hairlineWidth,
    width: responsive(75),
  },
  views: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsive(15),
  },
  viewPercent: {
    width: responsive(60),
    height: responsive(22),
    marginLeft: responsive(10),
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
  txtTab: {
    color: colors.GREYSEMI,
    ...TextStyles.normalSemiBold,
  },
});
