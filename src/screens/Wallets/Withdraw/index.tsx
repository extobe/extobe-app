/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  PixelRatio,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const WithdrawScreen = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const [address, setAddress] = useState<string>();
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
          <Text style={styles.largeBoldBlue}>Withdraw</Text>
        </View>
        <Image
          source={ICONS.iconDocumentBlack}
          style={styles.iconBack}
          resizeMode="contain"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.normalRglBlue}>Address</Text>
          <View style={styles.viewInput}>
            <TextInput
              value={address}
              onChangeText={(val) => setAddress(val)}
              autoCapitalize="none"
              style={styles.txtInput}
              placeholder={'Amount'}
              placeholderTextColor={colors.GREYSEMI}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={ICONS.iconAvatar}
                style={styles.iconAvatar}
                resizeMode="contain"
              />
              <Image
                source={ICONS.iconQR}
                style={styles.iconQR}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.normalRglBlue}>Network</Text>
          <View style={styles.viewInput}>
            <Text style={styles.normalRglBlue}>BNB Binance Chain (BEP20)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={ICONS.iconListDown}
                style={styles.iconListDown}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.normalRglBlue}>Amount</Text>
          <View style={styles.viewInput}>
            <TextInput
              value={address}
              onChangeText={(val) => setAddress(val)}
              autoCapitalize="none"
              style={styles.txtInput}
              placeholder={'Minimal 0.001'}
              placeholderTextColor={colors.GREYSEMI}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.mduBoldGreen}>MAX</Text>
              <View style={styles.viewColumn} />
              <Text style={styles.mduBoldBlue}>BTC</Text>
            </View>
          </View>
          <Text style={styles.normalRglGB}>
            8000000 BUSD/8000000 BUSD - 24h remaining limit
          </Text>
          <Text style={styles.normalSmbGB}>Tip:</Text>
          <View style={styles.viewRowTop}>
            <View style={styles.viewDot} />
            <Text style={styles.largeCaptionRglGB}>
              Please do not withdraw to the ICO or crowd funding address.
            </Text>
          </View>
          <View style={styles.viewRowTop}>
            <View style={styles.viewDot} />
            <Text style={styles.largeCaptionRglGB}>
              We will process your withdrawal in 30 minutes, it depends on the
              blockchain when the assets would finally transfered to your
              wallet.
            </Text>
          </View>
          <View style={styles.viewRowTop}>
            <View style={styles.viewDot} />
            <Text style={styles.largeCaptionRglGB}>
              To enhance the security of your assets, the large amount of
              withdrawal might be manually processed, please wait patiently.
            </Text>
          </View>
          <View
            style={{ ...styles.viewRowTop, justifyContent: 'space-between' }}
          >
            <Text style={styles.mduRglBlue}>Available</Text>
            <Text style={styles.mduBoldBlue}>10 BTC</Text>
          </View>
        </View>
        <View style={styles.viewLine} />
        <View style={{ paddingHorizontal: responsive(20) }}>
          <Text style={styles.mduRglBlue}>Receive amount</Text>
          <View
            style={{ ...styles.viewRowTop, justifyContent: 'space-between' }}
          >
            <View>
              <Text style={styles.largeSmbBlue}>0 BTC</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.mduRglBlue}>Fee: 0.0005 BTC</Text>
              </View>
            </View>
            <View style={styles.viewButton}>
              <Text style={styles.largeBoldWhite}>Withdraw</Text>
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
  viewLine: {
    backgroundColor: colors.WHITEGREY,
    width: '100%',
    height: responsive(3),
    marginTop: responsive(5),
    marginBottom: responsive(15),
  },
  viewColumn: {
    backgroundColor: colors.GREYSEMI,
    width: responsive(1.5),
    height: responsive(24),
    marginTop: responsive(5),
    marginHorizontal: responsive(8),
  },
  viewRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsive(15),
  },
  viewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    borderRadius: responsive(5),
    width: responsive(153),
    height: responsive(42),
  },
  viewInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: responsive(5),
    width: responsive(337),
    height: responsive(45),
    borderWidth: responsive(2),
    borderColor: colors.WHITEGREY,
    marginTop: responsive(10),
    marginBottom: responsive(20),
    paddingHorizontal: responsive(15),
  },
  txtInput: {
    color: colors.GREYBOLD,
    height: responsive(45),
    width: responsive(220),
    ...TextStyles.normaleRegular,
  },
  viewDot: {
    backgroundColor: colors.GREYSEMI,
    height: responsive(5.5),
    width: responsive(5.5),
    borderRadius: 30 / PixelRatio.get(),
    marginRight: responsive(7),
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
  largeCaptionRglGB: {
    color: colors.GREYBOLD,
    ...TextStyles.largeCaption,
  },
  largeSmbBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.largeSemiBold,
  },
  largeBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.largeSemiBold,
  },
  mduBoldBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumBold,
  },
  largeBoldWhite: {
    color: colors.WHITE,
    ...TextStyles.largeSemiBold,
  },
  mduBoldGreen: {
    color: colors.GREEN,
    ...TextStyles.mediumBold,
  },
  mduRglBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumRegular,
  },
  iconBack: {
    height: responsive(20),
    width: responsive(15),
    marginRight: responsive(12),
  },
  iconQR: {
    height: responsive(20),
    width: responsive(20),
  },
  iconAvatar: {
    height: responsive(20),
    width: responsive(20),
    marginRight: responsive(15),
  },
  iconListDown: {
    height: responsive(13),
    width: responsive(13),
  },
});
