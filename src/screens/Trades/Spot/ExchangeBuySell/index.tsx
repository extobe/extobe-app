import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

import { useSocketExchangeBuySell } from '@hooks/useSocketExchangeBuySell';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const ExchangeBuySell = ({}: Props) => {
  const { dataCharts } = useSocketExchangeBuySell();

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
  const fixedMoney8 = (money) => {
    return parseFloat(parseFloat(money).toFixed(8));
  };
  const fillListBuy = dataCharts?.a?.filter((item: number) => item[1] > 0);
  const fillListSell = dataCharts?.b?.filter((item: number) => item[1] > 0);

  const listBuy = fillListBuy?.slice(0, 5)?.map((item: number) => {
    return (
      <>
        <View style={styles.viewInforBuySell}>
          <Text style={{ ...styles.txtPrice, color: colors.GREEN }}>
            {formatMoney(String(fixedMoney8(item[1])))}
          </Text>
          <Text style={styles.txtPrice}>
            {formatMoney(String(fixedMoney2(item[0])))}
          </Text>
        </View>
      </>
    );
  });
  const listSell = fillListSell?.slice(0, 5)?.map((item: number) => {
    return (
      <View style={styles.viewInforBuySell}>
        <Text style={{ ...styles.txtPrice, color: colors.ERROR }}>
          {formatMoney(String(fixedMoney2(item[1])))}
        </Text>
        <Text style={styles.txtPrice}>
          {formatMoney(String(fixedMoney8(item[0])))}
        </Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: responsive(335),
          //   backgroundColor: 'red',
        }}
      >
        <View>
          <View style={styles.views}>
            <Image
              source={ICONS.buttonBuy}
              style={{ width: responsive(105), height: responsive(35) }}
              resizeMode="contain"
            />
            <Text style={styles.txtBuy}>BUY</Text>
            <Image source={ICONS.buttonSell} style={styles.imageSell} />
            <Text style={styles.txtSell}>SELL</Text>
          </View>
          <View style={styles.viewLimit}>
            <Text style={styles.txtMduSmbGB}>Limit</Text>
            <Image
              source={ICONS.iconListDown}
              style={styles.iconListDown}
              resizeMode="contain"
            />
          </View>
          <View style={styles.viewAdjusted}>
            <Image
              source={ICONS.iconSubtraction}
              style={styles.iconSubtraction}
              resizeMode="contain"
            />
            <Text style={styles.txtMduSmbBlue}>439.3</Text>
            <Image
              source={ICONS.iconPlus}
              style={styles.iconPlus}
              resizeMode="contain"
            />
          </View>
          <View style={styles.viewAdjusted}>
            <Image
              source={ICONS.iconSubtraction}
              style={styles.iconSubtraction}
              resizeMode="contain"
            />
            <Text style={styles.txtMduSmbGB}>Amount (BTC)</Text>
            <Image
              source={ICONS.iconPlus}
              style={styles.iconPlus}
              resizeMode="contain"
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.viewPercent}>
              <Text style={styles.txtPercent}>25%</Text>
            </View>
            <View style={styles.viewPercent}>
              <Text style={styles.txtPercent}>50%</Text>
            </View>
            <View style={styles.viewPercent}>
              <Text style={styles.txtPercent}>75%</Text>
            </View>
            <View style={styles.viewPercent}>
              <Text style={styles.txtPercent}>100%</Text>
            </View>
          </View>
          <View style={{ ...styles.viewAdjusted, justifyContent: 'center' }}>
            <Text style={styles.txtMduSmbGB}>Total USDT</Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginTop: responsive(10),
              width: responsive(200),
            }}
          >
            <Text style={styles.txtPercent}>Avbl</Text>
            <Text style={styles.txtPercent}>0 USDT</Text>
          </View>
          <View
            style={{
              ...styles.viewAdjusted,
              justifyContent: 'center',
              backgroundColor: colors.GREEN,
            }}
          >
            <Text style={styles.txtMduSmbWhite}>BUY BTC</Text>
          </View>
        </View>
        <View>
          <View style={styles.viewSecond}>
            <View>
              <Text>Price</Text>
              <Text>(BTC)</Text>
            </View>
            <View>
              <Text>Amount</Text>
              <Text>(USDT)</Text>
            </View>
          </View>
          <View style={{ height: responsive(265) }}>
            {listBuy}
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ ...TextStyles.mediumSemiBold, color: colors.GREEN }}
              >
                439.3
              </Text>
              <Text style={styles.txtPercent}>$439.30</Text>
            </View>
            {listSell}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: responsive(5),
            }}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: colors.WHITELIGHT,
                marginLeft: responsive(10),
                width: responsive(100),
                justifyContent: 'center',
                height: responsive(25),
                borderRadius: responsive(5),
              }}
            >
              <Text>Decimal</Text>
            </View>
            <Image
              source={ICONS.iconDocumentBlack}
              style={{
                width: responsive(20),
                height: responsive(20),
                marginLeft: responsive(15),
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsive(200),
  },
  viewSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsive(150),
    // backgroundColor: 'red',
    paddingLeft: responsive(10),
  },
  viewLimit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsive(10),
  },
  viewAdjusted: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITELIGHT,
    width: responsive(200),
    height: responsive(40),
    justifyContent: 'space-between',
    paddingHorizontal: responsive(12),
    marginTop: responsive(10),
    borderRadius: responsive(5),
  },
  viewInforBuySell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsive(10),
    paddingRight: responsive(10),
    marginTop: responsive(2),
    width: responsive(150),
    justifyContent: 'space-between',
  },
  viewPercent: {
    marginTop: responsive(10),
    height: responsive(25),
    width: responsive(45),
    marginRight: responsive(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITELIGHT,
    borderRadius: responsive(5),
  },
  txtPrice: {
    color: colors.GREYBOLD,
    ...TextStyles.largeCaptionSemiBold,
  },
  txtPercent: {
    color: colors.GREYSEMI,
    ...TextStyles.largeCaptionSemiBold,
  },
  txtMduSmbGB: {
    ...TextStyles.mediumSemiBold,
    color: colors.GREYSEMI,
  },
  txtMduSmbBlue: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  txtMduSmbWhite: {
    ...TextStyles.mediumSemiBold,
    color: colors.WHITE,
  },
  txtBuy: {
    color: colors.WHITE,
    position: 'absolute',
    left: 40,
    ...TextStyles.mediumSemiBold,
  },
  txtSell: {
    color: colors.GREYSEMI,
    position: 'absolute',
    left: 145,
    ...TextStyles.mediumSemiBold,
  },
  imageSell: {
    width: responsive(105),
    height: responsive(35),
    position: 'absolute',
    left: 105,
  },
  iconSubtraction: {
    width: responsive(15),
    height: responsive(5),
  },
  iconPlus: {
    width: responsive(18),
    height: responsive(18),
  },
  iconListDown: {
    width: responsive(12),
    height: responsive(12),
    marginLeft: responsive(7),
    marginTop: responsive(5),
  },
});
