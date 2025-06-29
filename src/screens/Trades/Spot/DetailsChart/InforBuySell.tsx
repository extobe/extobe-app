import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MyButton } from '@components/MyButton';

import { useSocketExchangeBuySell } from '@hooks/useSocketExchangeBuySell';
import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

interface Props {}
export const InforBuySell = ({}: Props) => {
  const { dataCharts } = useSocketExchangeBuySell();

  const { navigate } = useNavigation<RootScreenNavigationProp>();
  // console.log('====================================');
  // console.log(dataCharts?.b);
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
  const fixedMoney8 = (money) => {
    return parseFloat(parseFloat(money).toFixed(8));
  };
  function truncate(value: number, precision: number) {
    var step = Math.pow(10, precision || 0);
    var temp = Math.trunc(step * value);
    var a = temp / step;
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const fillListBuy = dataCharts?.a?.filter((item: number) => item[1] > 0);
  const fillListSell = dataCharts?.b?.filter((item: number) => item[1] > 0);
  // console.log('====================================');
  // console.log(fillListBuy);
  // console.log('====================================');
  const listBuy = fillListBuy?.slice(0, 5)?.map((item: number) => {
    return (
      <>
        <View style={styles.viewPercent}>
          <Text style={styles.txtPrice}>
            {' '}
            {formatMoney(String(fixedMoney8(item[1])))}
          </Text>
          <Text style={{ ...styles.txtPrice, color: colors.GREEN }}>
            {formatMoney(String(fixedMoney2(item[0])))}
          </Text>
        </View>
      </>
    );
  });
  const listSell = fillListSell?.slice(0, 5)?.map((item: number) => {
    return (
      <View style={styles.viewPercent}>
        <Text style={{ ...styles.txtPrice, color: colors.ERROR }}>
          {formatMoney(String(fixedMoney2(item[0])))}
        </Text>
        <Text style={styles.txtPrice}>
          {formatMoney(String(fixedMoney8(item[1])))}
        </Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>{listBuy}</View>
        <View>{listSell}</View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <MyButton
          buttonText={'BUY'}
          textStyle={{ alignItems: 'center' }}
          style={styles.button}
          onPress={() => {
            navigate('ConvertBuySell', {
              flat: true,
            });
          }}
        />
        <MyButton
          buttonText={'SELL'}
          textStyle={{ alignItems: 'center' }}
          style={{
            ...styles.button,
            marginLeft: responsive(30),
            backgroundColor: colors.ERROR,
          }}
          onPress={() => {
            navigate('ConvertBuySell', {
              flat: false,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  viewPercent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsive(10),
    paddingRight: responsive(20),
    marginTop: responsive(10),
    width: responsive(189),
    justifyContent: 'space-between',
  },
  txtPrice: {
    color: colors.GREYBOLD,
    ...TextStyles.largeCaptionSemiBold,
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(160),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    height: responsive(45),
    marginLeft: responsive(10),
    marginTop: responsive(20),
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
    marginRight: responsive(10),
  },
});
