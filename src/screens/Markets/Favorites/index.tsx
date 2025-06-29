import React, { useContext } from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { ListCoinContext } from '@contexts/ListCoinProvider';

import { colors, responsive, TextStyles } from '@styles';

interface Props {}
export const Favarites = ({}: Props) => {
  const list = useContext(ListCoinContext);

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
  const fixedMoney2 = (money) => {
    return parseFloat(parseFloat(money).toFixed(2));
  };
  const dataRealtime = list?.listCoin !== null ? list?.listCoin : [];

  const listCoin = dataRealtime?.map((item: any) => {
    const totalVND = () => {
      let total = '';
      total += item?.price * 23500;
      return total;
    };
    const colorPercent = item?.percent < 0 ? colors.ERROR : colors.GREENBOLD;
    const backgroundPercent = item?.percent < 0 ? colors.PINK : colors.BLUESKY;
    const percent = item?.percent < 0 ? item?.percent : `+${item?.percent}`;
    return (
      <View style={styles.viewColumn}>
        <View style={styles.views}>
          <Text style={styles.txtName}>{item.name}</Text>
          <Text style={styles.txtNames}>/BUSD</Text>
        </View>
        <View style={styles.viewPrice}>
          <Text style={styles.txtName}>
            ${formatMoney(String(fixedMoney(item?.price)))}
          </Text>
          <Text style={styles.txtVND}>{truncate(totalVND())} đ</Text>
        </View>
        <View
          style={[styles.viewPercent, { backgroundColor: backgroundPercent }]}
        >
          <Text style={{ color: colorPercent, ...TextStyles.normalSemiBold }}>
            {formatMoney(String(fixedMoney2(percent)))}%
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.view}>
      <View style={styles.viewTop}>
        <View style={styles.viewTops}>
          <Text style={styles.txtTop}>Spot </Text>
        </View>
        <Text style={styles.txtTop}>Futures</Text>
      </View>
      <View style={styles.viewLine} />
      <View style={styles.viewTitle}>
        <Text style={styles.txtPair}>Name/Vol </Text>
        <Text style={styles.txtPrice}>Price </Text>
        <Text style={styles.txtPair}>(24)Change </Text>
      </View>
      {listCoin}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingTop: responsive(15),
    backgroundColor: colors.WHITE,
  },
  views: {
    width: responsive(95),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLine: {
    backgroundColor: colors.WHITEGREY,
    width: '100%',
    height: responsive(2),
    marginVertical: responsive(12),
  },
  viewColumn: {
    flexDirection: 'row',
    paddingBottom: responsive(15),
    alignItems: 'center',
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsive(20),
  },
  viewPrice: {
    width: responsive(105),
    marginLeft: responsive(40),
  },
  viewPercent: {
    width: responsive(70),
    height: responsive(30),
    marginLeft: responsive(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsive(5),
  },
  viewTops: {
    backgroundColor: colors.WHITELIGHT,
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(3),
    borderRadius: responsive(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsive(10),
  },
  txtPrice: {
    color: colors.GREY,
    marginLeft: responsive(35),
    ...TextStyles.normaleRegular,
  },
  txtName: {
    color: colors.BLUETEXT,
    ...TextStyles.normalBold,
  },
  txtNames: {
    color: colors.BLUETEXT,
    ...TextStyles.normaleRegular,
  },
  txtVND: {
    color: colors.GREYSEMI,
    ...TextStyles.largeCaption,
  },
  txtTop: {
    color: colors.BLUETEXT,
    ...TextStyles.normalSemiBold,
  },
  txtPair: {
    color: colors.GREY,
    ...TextStyles.normaleRegular,
  },
});
