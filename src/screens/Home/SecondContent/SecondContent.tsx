/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';
import { IMAGES } from '@assets/images';

interface Props {}
export const SecondContent = ({}: Props) => {
  return (
    <View style={styles.view}>
      <View style={styles.views}>
        <View style={styles.viewBG}>
          <Text style={styles.txtNormalSMB}>Buy with Visa/MaserCard</Text>
          <View style={styles.views}>
            <Image
              source={IMAGES.CricleNext}
              style={styles.imageCircle}
              resizeMode="contain"
            />
            <Image
              source={IMAGES.HomeVisa}
              style={styles.imageCard}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.viewBG}>
          <Text style={styles.txtNormalSMB}>
            Buy with Local Currency on P2P
          </Text>
          <View style={styles.views}>
            <Image
              source={IMAGES.CricleNext}
              style={styles.imageCircle}
              resizeMode="contain"
            />
            <Image
              source={IMAGES.HomeVisaMaster}
              style={styles.imageP2P}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.viewSecond}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconDeposit}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconReferral}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Referral</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconTournament}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Tournament</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconMargin}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Margin</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewSeconds}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconLaunchpad}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Launchpad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconAtutoInvest}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Atuto-Invest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconSwapFarming}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>Swap Farming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            source={ICONS.iconMore}
            style={styles.imageIcon}
            resizeMode="contain"
          />
          <Text style={styles.txtNormalRGL}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.WHITE,
    width: responsive(375),
    height: responsive(270),
    paddingTop: responsive(14),
    marginBottom: responsive(10),
    paddingHorizontal: responsive(20),
  },
  views: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewBG: {
    height: responsive(110),
    width: responsive(163),
    backgroundColor: colors.BLUESKY,
    borderRadius: responsive(5),
    paddingHorizontal: responsive(15),
    paddingVertical: responsive(10),
  },
  viewSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsive(25),
    marginBottom: responsive(25),
  },
  viewSeconds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive(25),
  },
  txtNormalSMB: {
    ...TextStyles.normalSemiBold,
    color: colors.GREYBOLD,
  },
  txtNormalRGL: {
    color: colors.GREY,
    ...TextStyles.normaleRegular,
  },
  imageIcon: {
    height: responsive(20),
    width: responsive(20),
  },
  imageCircle: {
    width: responsive(30),
    height: responsive(30),
  },
  imageCard: {
    width: responsive(68),
    height: responsive(48),
  },
  imageP2P: {
    width: responsive(55),
    height: responsive(52),
  },
});
