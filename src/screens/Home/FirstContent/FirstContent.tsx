/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';

import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { CommonContext } from '@contexts/Common';
import { ListCoinContext } from '@contexts/ListCoinProvider';

import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const FirstContent = ({}: Props) => {
  const common = useContext(CommonContext);
  const listCoin = useContext(ListCoinContext);

  const dataRealtime = listCoin?.listCoin !== null ? listCoin?.listCoin : [];
  const dataBNB = dataRealtime?.filter(
    (item: { name: string }) => item?.name === 'BNB',
  );
  const dataBTC = dataRealtime?.filter(
    (item: { name: string }) => item?.name === 'BTC',
  );
  const dataETH = dataRealtime?.filter(
    (item: { name: string }) => item?.name === 'ETH',
  );
  const [data, setData] = useState<any>();

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
  useEffect(() => {
    if (listCoin?.listCoin !== undefined) {
      setData({
        nameBNB: dataBNB[0]?.name,
        nameBTC: dataBTC[0]?.name,
        nameETH: dataETH[0]?.name,
        priceBNB: dataBNB[0]?.price,
        priceBTC: dataBTC[0]?.price,
        priceETH: dataETH[0]?.price,
        priceVndBNB: dataBNB[0]?.price * 23500,
        priceVndBTC: dataBTC[0]?.price * 23500,
        priceVndETH: dataETH[0]?.price * 23500,
        colorPercentBNB: dataBNB[0]?.percent < 0 ? colors.ERROR : colors.GREEN,
        colorPercentBTC: dataBTC[0]?.percent < 0 ? colors.ERROR : colors.GREEN,
        colorPercentETH: dataETH[0]?.percent < 0 ? colors.ERROR : colors.GREEN,
        percentBNB:
          dataBNB[0]?.percent < 0
            ? dataBNB[0]?.percent
            : `+${dataBNB[0]?.percent}`,
        percentBTC:
          dataBTC[0]?.percent < 0
            ? dataBTC[0]?.percent
            : `+${dataBTC[0]?.percent}`,
        percentETH:
          dataETH[0]?.percent < 0
            ? dataETH[0]?.percent
            : `+${dataETH[0]?.percent}`,
      });
    } else {
      setData({});
    }
  }, [listCoin?.listCoin]);
  return (
    <View style={styles.view}>
      <View style={styles.views}>
        <Image
          source={ICONS.iconNotification}
          style={styles.imageNotifi}
          resizeMode="contain"
        />
        <Text style={styles.txtIntro}>
          Introducing Swaptobe (SWB) on Extobe ...
        </Text>
      </View>
      <View style={styles.viewLine} />
      <View style={styles.viewPercent}>
        {common?.loading === false ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nameCoin}>{data?.nameBNB} </Text>
              <Text
                style={{
                  color: data?.colorPercentBNB,
                  ...TextStyles.normalSemiBold,
                }}
              >
                {data?.percentBNB}%
              </Text>
            </View>
            <Text style={styles.txtPrice}>
              {formatMoney(String(fixedMoney(data?.priceBNB)))} $
            </Text>
            <Text style={styles.txtPriceVND}>
              đ {truncate(data?.priceVndBNB)}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color={colors.GREEN} />
        )}
        {common?.loading === false ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nameCoin}> {data?.nameBTC} </Text>
              <Text
                style={{
                  color: data?.colorPercentBTC,
                  ...TextStyles.normalSemiBold,
                }}
              >
                {data?.percentBTC}%
              </Text>
            </View>
            <Text style={styles.txtPrice}>
              {' '}
              {formatMoney(String(fixedMoney(data?.priceBTC)))} $
            </Text>
            <Text style={styles.txtPriceVND}>
              đ {truncate(data?.priceVndBTC)}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color={colors.GREEN} />
        )}
        {common?.loading === false ? (
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.nameCoin}> {data?.nameETH} </Text>
              <Text
                style={{
                  color: data?.colorPercentETH,
                  ...TextStyles.normalSemiBold,
                }}
              >
                {data?.percentETH}%
              </Text>
            </View>
            <Text style={styles.txtPrice}>
              {' '}
              {formatMoney(String(fixedMoney(data?.priceETH)))} $
            </Text>
            <Text style={styles.txtPriceVND}>
              đ {truncate(data?.priceVndETH)}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color={colors.GREEN} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.WHITE,
    width: responsive(375),
    height: responsive(140),
    borderTopLeftRadius: responsive(20),
    borderTopRightRadius: responsive(20),
    marginVertical: responsive(12),
    paddingTop: responsive(14),
  },
  viewLine: {
    backgroundColor: colors.WHITEGREY,
    width: responsive(335),
    height: responsive(2),
    marginLeft: responsive(20),
    marginVertical: responsive(12),
  },
  viewPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: responsive(20),
  },
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsive(27),
  },
  imageNotifi: {
    height: responsive(13),
    width: responsive(13.5),
    marginRight: responsive(5),
  },
  txtIntro: {
    color: colors.GREYSEMI,
    ...TextStyles.normaleRegular,
  },
  nameCoin: {
    color: colors.GREYSEMI,
    ...TextStyles.normalSemiBold,
  },
  txtPrice: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumBold,
  },
  txtPriceVND: {
    color: colors.GREYSEMI,
    ...TextStyles.largeCaption,
  },
});
