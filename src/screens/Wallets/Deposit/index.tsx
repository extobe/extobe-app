/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const DepositScreen = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.viewBack}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigate('Wallets');
            }}
          >
            <Image
              source={ICONS.iconBack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.mduBoldBlue}>Deposit</Text>
        </View>
        <Image
          source={ICONS.iconDocumentBlack}
          style={styles.iconBack}
          resizeMode="contain"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.normalRglBlue}>Network</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={styles.normalSmbBlue}>NB Binance Chain (BEP20)</Text>
            <Image
              source={ICONS.iconTranferBlack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.viewQRcode}>
              <QRCode
                value={'243rfedgdrgdjsnvdisvbkjdsv'}
                size={110}
                backgroundColor={colors.WHITE}
                logoBackgroundColor={colors.WHITE}
              />
            </View>
            <Text style={styles.normalSmbBlue}>
              bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23
            </Text>
            <View style={styles.viewButton}>
              <View style={styles.button}>
                <Text style={styles.mduSmbWhite}>Copy Address</Text>
              </View>
              <View
                style={{
                  ...styles.button,
                  backgroundColor: colors.GREYLIGHT,
                  marginLeft: responsive(10),
                }}
              >
                <Text style={styles.mduSmbWhite}>Save QR Code</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.viewLine} />
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.normalRglBlue}>Your MEMO</Text>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.viewQRcode}>
              <QRCode
                value={'243rfedgdrgdjsnvdisvbkjdsv'}
                size={110}
                backgroundColor={colors.WHITE}
                logoBackgroundColor={colors.WHITE}
              />
            </View>
            <Text style={styles.normalSmbBlue}>1068496542324</Text>
            <View style={styles.viewButton}>
              <View style={styles.button}>
                <Text style={styles.mduSmbWhite}>Copy MEMO</Text>
              </View>
              <View
                style={{
                  ...styles.button,
                  backgroundColor: colors.GREYLIGHT,
                  marginLeft: responsive(10),
                }}
              >
                <Text style={styles.mduSmbWhite}>Save QR Code</Text>
              </View>
            </View>
          </View>
          <View style={styles.viewFooter}>
            <View style={styles.viewFotters}>
              <View>
                <Text style={styles.normalRglGB}>Expected arrival </Text>
                <Text style={styles.normalSmbGB}>1 network confirmations</Text>
              </View>
              <View>
                <Text style={styles.normalRglGB}>Minimum deposit</Text>
                <Text style={styles.normalSmbGB}>0.00000001 BTC</Text>
              </View>
            </View>
            <View style={styles.viewFotters}>
              <View>
                <Text style={styles.normalRglGB}>Expected unlock </Text>
                <Text style={styles.normalSmbGB}>1 network confirmations </Text>
              </View>
              <View>
                <Text style={styles.normalRglGB}>Selected wallet</Text>
                <Text style={styles.normalSmbGB}>Spot Wallet</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingBottom: responsive(20),
  },
  viewBack: {
    height: responsive(50),
    paddingHorizontal: responsive(20),
    backgroundColor: colors.WHITELIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsive(15),
  },
  viewQRcode: {
    alignItems: 'center',
    paddingVertical: responsive(10),
    justifyContent: 'center',
    marginVertical: responsive(20),
    width: responsive(110),
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(124),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    height: responsive(32),
    alignItems: 'center',
  },
  viewButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: responsive(10),
  },
  viewLine: {
    backgroundColor: colors.WHITELIGHT,
    width: '100%',
    height: responsive(2),
    marginVertical: responsive(25),
  },
  viewFooter: {
    height: responsive(130),
    width: responsive(340),
    backgroundColor: colors.WHITEGREY,
    borderRadius: responsive(5),
    marginTop: responsive(40),
    flexDirection: 'row',
  },
  viewFotters: {
    width: responsive(170),
    justifyContent: 'space-evenly',
    paddingLeft: responsive(16),
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
  normalRglGB: {
    color: colors.GREYBOLD,
    ...TextStyles.normaleRegular,
  },
  mduBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.largeBold,
  },
  mduSmbWhite: {
    color: colors.WHITE,
    ...TextStyles.mediumSemiBold,
  },
  iconBack: {
    height: responsive(20),
    width: responsive(15),
    marginRight: responsive(12),
  },
});
