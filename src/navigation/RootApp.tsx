/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';

import { Image, StyleSheet, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

import { colors, responsive, TextStyles } from '@styles';

import { AuthUserContext } from '../contexts/AuthUserProvider';
import { RootStack } from './navigator';
import { renderAuth } from './renderAuth';
import { renderMain } from './renderMain';

import { ICONS } from '@assets/icons';

interface Props {}
export const RootApp = ({}: Props) => {
  const auth = useContext(AuthUserContext);
  const [isToken, setToken] = useState<any>(null);
  const storeToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setToken(true);
    } else {
      setToken(false);
    }
  };
  useEffect(() => {
    storeToken();
  }, [auth?.isAuth]);

  const renderRootStack = () => {
    SplashScreen.hide();
    if (isToken === true) {
      return renderMain();
    } else {
      return renderMain();
    }
  };
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={({ route }) => {
          return {
            headerShown:
              route.name !== 'MainTab' &&
              route.name !== 'Welcome' &&
              route.name !== 'Login' &&
              route.name !== 'Register' &&
              route.name !== 'CurrentLocation' &&
              route.name !== 'Verification' &&
              route.name !== 'SelectLanguage' &&
              route.name !== 'Setting' &&
              route.name !== 'SettingSecond' &&
              route.name !== 'Security' &&
              route.name !== 'DetailsChart' &&
              route.name !== 'Notification' &&
              route.name !== 'ConvertBuySell' &&
              route.name !== 'Deposit' &&
              route.name !== 'Withdraw' &&
              route.name !== 'ListCoinSearch' &&
              route.name !== 'DetailCoin' &&
              route.name !== 'Identification' &&
              route.name !== 'NewPassWord',
            headerBackground: () => <View style={styles.header} />,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.largeSmbBlue,
            headerLeft: (props) => {
              const { onPress } = props;
              return (
                <View style={styles.viewRow}>
                  <TouchableOpacity onPress={onPress}>
                    <Image source={ICONS.iconBack} style={styles.iconBack} />
                  </TouchableOpacity>
                </View>
              );
            },
          };
        }}
      >
        {renderRootStack()}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flex: 1,
    backgroundColor: colors.WHITELIGHT,
    height: responsive(50),
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeSmbBlue: {
    color: colors.BLUETEXT,
    ...TextStyles.largeSemiBold,
  },
  iconBack: {
    width: responsive(20),
    height: responsive(20),
    marginLeft: responsive(20),
  },
});
