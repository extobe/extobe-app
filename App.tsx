import React, { useEffect } from 'react';

import { Platform, StatusBar, View } from 'react-native';

import { AuthUserProvider } from '@contexts/AuthUserProvider';
import { CommonProvider } from '@contexts/Common';
import { ListCoinProvider } from '@contexts/ListCoinProvider';
import FlashMessage from 'react-native-flash-message';

import ModalLoading from '@components/Modal/ModalLoading';

import { RootApp } from '@navigation/RootApp';
import { colors, responsive } from '@styles';
import {
  NotificationListen,
  requestUserPermission,
} from '@utils/pushnotifications';

const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? responsive(47) : StatusBar.currentHeight;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
//
interface Props {}
const App = ({}: Props) => {
  useEffect(() => {
    NotificationListen();
    requestUserPermission();
  }, []);
  return (
    <AuthUserProvider>
      <ListCoinProvider>
        <CommonProvider>
          <View
            style={{
              height: STATUS_BAR_HEIGHT,
              backgroundColor: colors.GREEN,
            }}
          >
            <StatusBar
              translucent
              barStyle="light-content"
              backgroundColor={'transparent'}
            />
          </View>
          <RootApp />
          <ModalLoading />
          <FlashMessage
            position={
              Platform.OS === 'ios'
                ? 'top'
                : { top: StatusBar.currentHeight, left: 0, right: 0 }
            }
            floating={Platform.OS !== 'ios'}
          />
        </CommonProvider>
      </ListCoinProvider>
    </AuthUserProvider>
  );
};

export default App;
