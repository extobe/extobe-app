import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  TextInput,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MyButton } from '@components/MyButton';

import {
  RootScreenNavigationProp,
  RootScreenRouteProp,
} from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const ConvertBuySellScreen = ({ route }: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const flats = route?.params?.flat;

  const [flat, setFlat] = useState<boolean>(flats);
  const [marginLeft, setMarginLeft] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const translateX = useRef(new Animated.Value(0)).current;

  const chosseBuy = (type: number) => {
    setMarginLeft(true);
    Animated.timing(translateX, {
      toValue: responsive(type),
      duration: 200,
      useNativeDriver: true,
    }).start();
    if (flat === false) {
      setFlat(true);
      return flat;
    } else {
      setFlat(false);
      return flat;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => {
              navigate('DetailsChart');
            }}
          >
            <Image
              source={ICONS.iconBack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.txtLargeSmbBlue}>Visa/Master Card</Text>
          <View />
        </View>
        <View style={styles.viewBuySell}>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(20);
            }}
            disabled={flat}
          >
            <Text
              style={
                flat === true
                  ? { ...styles.txtBuySell, color: colors.GREEN }
                  : styles.txtBuySell
              }
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              chosseBuy(65);
            }}
            disabled={!flat}
          >
            <Text
              style={
                !flat
                  ? { ...styles.txtBuySell, color: colors.GREEN }
                  : styles.txtBuySell
              }
            >
              Sell
            </Text>
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
              flat && !marginLeft
                ? {
                    ...styles.viewActiveLine,
                    marginLeft: responsive(20),
                    transform: [
                      {
                        translateX,
                      },
                    ],
                  }
                : !flat && !marginLeft
                ? {
                    ...styles.viewActiveLine,
                    marginLeft: responsive(65),
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
            marginVertical: responsive(70),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={ICONS.iconAvatar}
              style={{
                height: responsive(40),
                width: responsive(40),
              }}
              resizeMode="contain"
            />
            <Text>USD</Text>
          </View>
          <Image
            source={ICONS.iconTranferGreen}
            style={{
              height: responsive(20),
              width: responsive(20),
              marginHorizontal: responsive(30),
              marginBottom: responsive(12),
            }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center' }}>
            <Image
              source={ICONS.iconAvatar}
              style={{
                height: responsive(40),
                width: responsive(40),
              }}
              resizeMode="contain"
            />
            <Text>USDT</Text>
          </View>
        </View>
        {flat && (
          <>
            <View style={{ marginHorizontal: responsive(20) }}>
              <Text style={styles.txtNormalRglBlue}>I want to spend</Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  value={value}
                  onChangeText={(val) => setValue(val)}
                  autoCapitalize="none"
                  style={styles.txtInput}
                  placeholder={'Amount'}
                  placeholderTextColor={colors.GREYSEMI}
                />
                <Text style={styles.txtMDUSmbBlue}>USD</Text>
              </View>
              <Text style={styles.txtNormalRglBlue}>I will receive</Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  value={value}
                  onChangeText={(val) => setValue(val)}
                  autoCapitalize="none"
                  style={styles.txtInput}
                  placeholder={'Amount'}
                  placeholderTextColor={colors.GREYSEMI}
                />
                <Text style={styles.txtMDUSmbBlue}>BTC</Text>
              </View>
              <View />
              <Text style={styles.txtNormalRglBlue}>
                Price: <Text style={{ color: colors.GREEN }}>60,000,000</Text>{' '}
                USD/BTC
              </Text>
              <MyButton
                buttonText={'Buy USDT'}
                textStyle={{ alignItems: 'center' }}
                //   onPress={submit}
                style={styles.viewButton}
              />
            </View>
          </>
        )}
        {!flat && (
          <>
            <View style={{ marginHorizontal: responsive(20) }}>
              <Text style={styles.txtNormalRglBlue}>I want to sell</Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  value={value}
                  onChangeText={(val) => setValue(val)}
                  autoCapitalize="none"
                  style={styles.txtInput}
                  placeholder={'Amount'}
                  placeholderTextColor={colors.GREYSEMI}
                />
                <Text style={styles.txtMDUSmbBlue}>BTC</Text>
              </View>
              <Text style={styles.txtNormalRglBlue}>I will send</Text>
              <View style={styles.viewTextInput}>
                <TextInput
                  value={value}
                  onChangeText={(val) => setValue(val)}
                  autoCapitalize="none"
                  style={styles.txtInput}
                  placeholder={'Amount'}
                  placeholderTextColor={colors.GREYSEMI}
                />
                <Text style={styles.txtMDUSmbBlue}>USD</Text>
              </View>
              <Text style={styles.txtNormalRglBlue}>
                Price: <Text style={{ color: colors.ERROR }}>60,000,000</Text>{' '}
                USD/BTC
              </Text>
              <MyButton
                buttonText={'Sell USDT'}
                textStyle={{ alignItems: 'center' }}
                //   onPress={submit}
                style={{ ...styles.viewButton, backgroundColor: colors.ERROR }}
              />
            </View>
          </>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive(15),
    justifyContent: 'space-between',
  },
  viewBuySell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsive(10),
    marginLeft: responsive(30),
  },
  viewActiveLine: {
    position: 'absolute',
    height: 15 * StyleSheet.hairlineWidth,
    width: responsive(45),
    backgroundColor: colors.GREEN,
    borderRadius: responsive(100),
    bottom: -0.9,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsive(35),
    height: responsive(40),
    width: responsive(337),
    borderRadius: responsive(5),
    backgroundColor: colors.GREEN,
    alignItems: 'center',
  },
  viewTextInput: {
    height: responsive(40),
    width: responsive(337),
    borderColor: colors.WHITEGREY,
    paddingHorizontal: responsive(15),
    borderWidth: 5 * StyleSheet.hairlineWidth,
    borderRadius: responsive(5),
    marginTop: responsive(10),
    marginBottom: responsive(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtInput: {
    color: colors.GREYBOLD,
    height: responsive(40),
    width: responsive(250),
  },
  txtBuySell: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
    marginRight: responsive(20),
  },
  txtLargeSmbBlue: {
    ...TextStyles.largeSemiBold,
    color: colors.BLUETEXT,
  },
  txtMDUSmbBlue: {
    ...TextStyles.mediumSemiBold,
    color: colors.BLUETEXT,
  },
  txtNormalRglBlue: {
    ...TextStyles.normaleRegular,
    color: colors.BLUETEXT,
  },
  iconBack: {
    height: responsive(18),
    width: responsive(18),
  },
});
