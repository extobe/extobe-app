/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  RootScreenNavigationProp,
  RootScreenRouteProp,
} from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const DetailCoinScreen = ({ route }: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const { data } = route?.params;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => {
              navigate('ListCoinSearch');
            }}
          >
            <Image
              source={ICONS.iconBack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconAvatar}
              style={{ ...styles.iconBack, marginRight: responsive(10) }}
              resizeMode="contain"
            />
            <Text style={styles.txtLargeSmbBlue}>{data?.name}</Text>
          </View>
          <Image
            source={ICONS.iconDocumentBlack}
            style={styles.iconBack}
            resizeMode="contain"
          />
        </View>
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.normalRglBlue}>Total</Text>
          <Text style={styles.mduBoldBlue}>0.0005826</Text>
          <View style={{ ...styles.viewRow, marginTop: responsive(20) }}>
            <View style={{ width: '50%' }}>
              <Text style={styles.normalRglBlue}>Available</Text>
              <Text style={styles.normalSmbBlue}>0.0006494455</Text>
            </View>
            <View style={{ width: '50%' }}>
              <Text style={styles.normalRglBlue}>In order</Text>
              <Text style={styles.normalSmbBlue}>0.0006494455</Text>
            </View>
          </View>
        </View>
        <View style={styles.viewLine} />
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.mduBoldBlue}>Go to trade</Text>
          <View style={{ ...styles.viewRow, marginTop: responsive(10) }}>
            <View style={styles.viewButton}>
              <Text style={styles.normalRglGB}>BTC/USDT</Text>
              <View style={styles.viewRow}>
                <Text style={styles.normalSmbGB}>0.0096747566</Text>
                <Text style={styles.normalSmbGreen}>+12%</Text>
              </View>
            </View>
            <View style={styles.viewButton}>
              <Text style={styles.normalRglGB}>BTC/USDT</Text>
              <View style={styles.viewRow}>
                <Text style={styles.normalSmbGB}>0.0096747566</Text>
                <Text style={styles.normalSmbGreen}>+12%</Text>
              </View>
            </View>
          </View>
          <View style={{ ...styles.viewRow, marginTop: responsive(10) }}>
            <View style={styles.viewButton}>
              <Text style={styles.normalRglGB}>BTC/USDT</Text>
              <View style={styles.viewRow}>
                <Text style={styles.normalSmbGB}>0.0096747566</Text>
                <Text style={styles.normalSmbGreen}>+12%</Text>
              </View>
            </View>
            <View style={styles.viewButton}>
              <Text style={styles.normalRglGB}>BTC/USDT</Text>
              <View style={styles.viewRow}>
                <Text style={styles.normalSmbGB}>0.0096747566</Text>
                <Text style={styles.normalSmbGreen}>+12%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewFooter}>
        <TouchableOpacity style={styles.viewButtonFooter}>
          <Text style={styles.mduSmbWhite}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.viewButtonFooter,
            backgroundColor: colors.WHITE,
            borderColor: colors.GREEN,
            borderWidth: responsive(1.5),
          }}
        >
          <Text style={styles.mduBoldBlue}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  viewBack: {
    height: responsive(50),
    paddingHorizontal: responsive(22),
    backgroundColor: colors.WHITELIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive(15),
    alignItems: 'center',
  },
  viewFooter: {
    position: 'absolute',
    bottom: responsive(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsive(20),
    width: '100%',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    width: responsive(160),
    height: responsive(50),
    backgroundColor: colors.WHITELIGHT,
    justifyContent: 'center',
    paddingHorizontal: responsive(10),
    borderRadius: responsive(3),
  },
  viewButtonFooter: {
    height: responsive(40),
    paddingHorizontal: responsive(22),
    backgroundColor: colors.GREEN,
    width: responsive(160),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsive(5),
  },
  viewLine: {
    backgroundColor: colors.WHITELIGHT,
    width: '100%',
    height: responsive(3),
    marginVertical: responsive(20),
  },
  txtLargeSmbBlue: {
    ...TextStyles.largeSemiBold,
    color: colors.BLUETEXT,
  },
  normalSmbBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.normalSemiBold,
  },
  normalRglBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.normaleRegular,
  },
  normalSmbGB: {
    color: colors.GREYBOLD,
    ...TextStyles.normalSemiBold,
  },
  normalSmbGreen: {
    color: colors.GREEN,
    ...TextStyles.normalSemiBold,
  },
  normalRglGB: {
    color: colors.GREYSEMI,
    ...TextStyles.normaleRegular,
  },
  mduBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumBold,
  },
  mduSmbWhite: {
    color: colors.WHITE,
    ...TextStyles.mediumSemiBold,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
  },
});
