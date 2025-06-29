import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';
import { IMAGES } from '@assets/images';

interface Props {}
export const TotalValue = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const deposit = () => {
    navigate('Deposit');
  };
  const withdraw = () => {
    navigate('Withdraw');
  };
  return (
    <View style={styles.view}>
      <View style={styles.viewTotal}>
        <View style={styles.viewTotals}>
          <View style={styles.viewTotalLeft}>
            <View style={styles.viewRow}>
              <Text style={styles.mduSmbBlue}>Total Value (BTC)</Text>
              <Image
                source={ICONS.iconHidePassword}
                style={styles.iconHideTotal}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.heading3Green}>0.000003183 BTC</Text>
            <View style={styles.viewRow}>
              <Image
                source={ICONS.iconEqual}
                style={styles.iconEqual}
                resizeMode="contain"
              />
              <Text style={styles.largeSmbBlue}>$ 1.37</Text>
            </View>
          </View>
          <Image
            source={IMAGES.TotalValue}
            style={styles.imageBG}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMain}>
        <TouchableOpacity onPress={deposit} style={styles.viewButton}>
          <Text style={styles.largeSmbWhite}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={withdraw} style={styles.viewButton}>
          <Text style={styles.largeSmbWhite}>Withdraw</Text>
        </TouchableOpacity>
        <View style={styles.viewButton}>
          <Text style={styles.largeSmbWhite}>Transfer</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.GREEN,
    height: responsive(270),
  },
  viewTotal: {
    backgroundColor: colors.WHITELIGHT,
    height: responsive(130),
    width: responsive(342),
    marginHorizontal: responsive(18),
    borderRadius: responsive(11),
    marginTop: responsive(20),
  },
  viewTotals: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: responsive(25),
  },
  viewTotalLeft: {
    justifyContent: 'space-around',
    height: responsive(130),
    width: responsive(205),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMain: {
    height: responsive(120),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: responsive(20),
  },
  viewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsive(100),
    height: responsive(36),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: responsive(5),
    marginBottom: responsive(10),
  },
  viewBorder: {
    height: responsive(20),
    width: '100%',
    backgroundColor: colors.WHITE,
    borderTopRightRadius: responsive(20),
    borderTopLeftRadius: responsive(20),
    position: 'absolute',
    bottom: -0,
  },
  mduSmbBlue: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  heading3Green: {
    ...TextStyles.heading3,
    color: colors.GREEN,
  },
  largeSmbBlue: {
    ...TextStyles.largeSemiBold,
    color: colors.BLUETEXT,
  },
  largeSmbWhite: {
    ...TextStyles.largeRegular,
    color: colors.WHITE,
  },
  iconHideTotal: {
    width: responsive(15),
    height: responsive(15),
    marginLeft: responsive(10),
  },
  iconEqual: {
    width: responsive(12),
    height: responsive(8),
    marginRight: responsive(7),
  },
  imageBG: {
    width: responsive(85),
    height: responsive(78),
  },
});
