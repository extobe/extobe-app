import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const Main = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={{ ...TextStyles.mediumSemiBold, color: colors.BLUETEXT }}>
          Portfolio
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={ICONS.iconUnCheckBoxGreen}
            style={styles.iconUnCheckBoxGreen}
            resizeMode="contain"
          />
          <Text
            style={{ ...TextStyles.normaleRegular, color: colors.BLUETEXT }}
          >
            Hide 0 Balance Wallets
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.viewButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconFiatSpot}
              style={styles.iconFiatSpot}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.normalRglBlue}>Fiat and Spot</Text>
              <Text style={styles.mduSmbBlue}>0.000003183 BTC</Text>
            </View>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconMargin2}
              style={styles.iconFiatSpot}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.normalRglBlue}>Margin</Text>
              <Text style={styles.mduSmbBlue}>0.000003183 BTC</Text>
            </View>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconFutures2}
              style={styles.iconFiatSpot}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.normalRglBlue}>Futures</Text>
              <Text style={styles.mduSmbBlue}>0.000003183 BTC</Text>
            </View>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={ICONS.iconEarn}
              style={styles.iconFiatSpot}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.normalRglBlue}>Earn</Text>
              <Text style={styles.mduSmbBlue}>0.000003183 BTC</Text>
            </View>
          </View>
          <Image
            source={ICONS.iconNext}
            style={styles.iconNext}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: responsive(50),
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive(5),
    paddingHorizontal: responsive(20),
  },
  viewButton: {
    backgroundColor: colors.WHITELIGHT,
    height: responsive(70),
    width: responsive(340),
    borderRadius: responsive(8),
    marginTop: responsive(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive(25),
  },
  normalRglBlue: {
    ...TextStyles.normaleRegular,
    color: colors.BLUETEXT,
  },
  mduSmbBlue: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  iconFiatSpot: {
    width: responsive(32),
    height: responsive(29),
    marginRight: responsive(25),
  },
  iconNext: {
    width: responsive(12),
    height: responsive(20),
  },
  iconUnCheckBoxGreen: {
    width: responsive(15),
    height: responsive(16),
    marginRight: responsive(5),
  },
});
