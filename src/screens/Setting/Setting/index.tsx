import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const SettingSecondScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigate('Setting');
              }}
            >
              <Image
                source={ICONS.iconBack}
                style={styles.iconBack}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.mduBoldBLUE}>Setting</Text>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.views}>
            <Text style={styles.txtTitle}>Language</Text>
            <Text style={styles.txtTitle}>Currency</Text>
            <Text style={styles.txtTitle}>Payment Currency</Text>
          </View>
          <View>
            <View style={styles.viewss}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.txtTitles}>English</Text>
                <Image
                  source={ICONS.iconNext}
                  style={styles.iconNext}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.txtTitles}>USD</Text>
                <Image
                  source={ICONS.iconNext}
                  style={styles.iconNext}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.txtTitles}>VND</Text>
                <Image
                  source={ICONS.iconNext}
                  style={styles.iconNext}
                  resizeMode="contain"
                />
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
  },
  viewBack: {
    height: responsive(50),
    paddingHorizontal: responsive(22),
    backgroundColor: colors.WHITELIGHT,
    justifyContent: 'center',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  views: {
    width: responsive(250),
    marginLeft: responsive(20),
    height: responsive(110),
    justifyContent: 'space-around',
  },
  viewss: {
    width: responsive(85),
    height: responsive(110),
    justifyContent: 'space-around',
  },
  txtTitle: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumRegular,
  },
  txtTitles: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumRegular,
  },
  mduBoldBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.largeBold,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
    marginRight: responsive(15),
  },
  iconNext: {
    height: responsive(13),
    width: responsive(13),
  },
});
