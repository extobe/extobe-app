import React, { useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Animated,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MyButton } from '@components/MyButton';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const IdentificationScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const [flat, setFlat] = useState<number>(0);
  const [marginLeft, setMarginLeft] = useState<boolean>(false);

  const translateX = useRef(new Animated.Value(0)).current;
  const chosseBuy = (type: number) => {
    setMarginLeft(true);
    Animated.timing(translateX, {
      toValue: responsive(type),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <View style={styles.viewRow}>
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
            <Text style={styles.largeBoldBLUE}>Personal Verification</Text>
          </View>
        </View>
        <View style={{ ...styles.viewRow, marginHorizontal: responsive(20) }}>
          <Text style={styles.normalRglBLUE}>Residential country/region:</Text>
          <Image
            source={ICONS.iconVietNam}
            style={styles.iconVietNam}
            resizeMode="contain"
          />
          <Text style={styles.normalBoldBLUE}>Việt Nam</Text>
        </View>
        <View style={styles.viewBuySell}>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(20);
              setFlat(0);
            }}
          >
            <View style={styles.viewAlignItem}>
              <Text
                style={
                  flat === 0
                    ? { ...styles.mduSmbBLUE, color: colors.GREEN }
                    : styles.mduSmbBLUE
                }
              >
                Current Features
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(139);
              setFlat(1);
            }}
          >
            <View style={styles.viewAlignItem}>
              <Text
                style={
                  flat === 1
                    ? { ...styles.mduSmbBLUE, color: colors.GREEN }
                    : styles.mduSmbBLUE
                }
              >
                Verified
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(258);
              setFlat(2);
            }}
          >
            <View style={styles.viewAlignItem}>
              <Text
                style={
                  flat === 2
                    ? { ...styles.mduSmbBLUE, color: colors.GREEN }
                    : styles.mduSmbBLUE
                }
              >
                Verified Plus
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              height: 5 * StyleSheet.hairlineWidth,
              backgroundColor: colors.GREYLIGHT,
            }}
          />
          <Animated.View
            style={
              !marginLeft && flat === 0
                ? {
                    ...styles.viewActiveLine,
                    marginLeft: responsive(20),
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
                : {
                    ...styles.viewActiveLine,
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
            }
          />
        </View>
        <View
          style={{
            paddingHorizontal: responsive(20),
            marginTop: responsive(30),
          }}
        >
          <Text style={styles.normalBoldBLUE}>Personal information</Text>
          <Text style={{ ...styles.normalBoldBLUE, marginTop: responsive(10) }}>
            Government-issued ID
          </Text>
          <Text style={{ ...styles.normalBoldBLUE, marginTop: responsive(10) }}>
            Facial recognition
          </Text>

          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(30) }}>
            Fiat Deposit & Withdrawal Limits
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(10) }}>
            $50K Daily
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(30) }}>
            Crypto Deposit Limit
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(10) }}>
            Crypto Withdrawal Limit
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(30) }}>
            Crypto Deposit Limit
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(10) }}>
            8M BUSD Daily
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(30) }}>
            P2P Transaction Limits
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(10) }}>
            Unlimited
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(30) }}>
            Other Features
          </Text>
          <Text style={{ ...styles.normalRglBLUE, marginTop: responsive(10) }}>
            LPD/OTC
          </Text>
          <MyButton
            buttonText={'Completed'}
            textStyle={{ alignItems: 'center' }}
            style={styles.button}
          />
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
    marginBottom: responsive(20),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewBuySell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsive(10),
    marginHorizontal: responsive(20),
  },
  viewAlignItem: {
    alignItems: 'center',
    width: responsive(100),
  },
  viewActiveLine: {
    position: 'absolute',
    height: 20 * StyleSheet.hairlineWidth,
    width: responsive(100),
    backgroundColor: colors.GREEN,
    borderRadius: responsive(100),
    bottom: -1.5,
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(240),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    height: responsive(45),
    marginHorizontal: responsive(48),
    marginTop: responsive(30),
  },
  largeBoldBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.largeBold,
  },
  mduSmbBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumSemiBold,
  },
  normalRglBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.normaleRegular,
  },
  normalBoldBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.normalBold,
  },
  normalSmbBLUE: {
    color: colors.BLUETEXT,
    ...TextStyles.normalSemiBold,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
    marginRight: responsive(15),
  },
  iconVietNam: {
    height: responsive(25),
    width: responsive(25),
    marginLeft: responsive(10),
    marginRight: responsive(3),
  },
});
