import React from 'react';

import { NotificationScreen } from '@screens/Home/Header/Notification';
import { SettingScreen } from '@screens/Setting';
import { IdentificationScreen } from '@screens/Setting/Identification';
import { SecurityScreen } from '@screens/Setting/Security';
import { AuthenticatorScreen } from '@screens/Setting/Security/Authenticator/Authenticator';
import { TwelveWordScreen } from '@screens/Setting/Security/WordMnemonic/TwelveWord';
import { TwelveWordSecondScreen } from '@screens/Setting/Security/WordMnemonic/TwelveWordSecond';
import { TwelveWordThirdScreen } from '@screens/Setting/Security/WordMnemonic/TwelveWordThird';
import { SettingSecondScreen } from '@screens/Setting/Setting';
import { DetailsChartScreen } from '@screens/Trades/Spot/DetailsChart';
import { ConvertBuySellScreen } from '@screens/Trades/Spot/DetailsChart/ConvertBuySell';
import { DepositScreen } from '@screens/Wallets/Deposit';
import { DetailCoinScreen } from '@screens/Wallets/DetailCoin';
import { ListCoinSearch } from '@screens/Wallets/Spot/Main/ListCoinSearch';
import { WithdrawScreen } from '@screens/Wallets/Withdraw';

import BottomBar from './BottomBar';
import { RootStack } from './navigator';

export const renderMain = () => {
  return (
    <>
      <RootStack.Screen name="MainTab" component={BottomBar} />
      <RootStack.Screen name="Setting" component={SettingScreen} />
      <RootStack.Screen name="Security" component={SecurityScreen} />
      <RootStack.Screen name="SettingSecond" component={SettingSecondScreen} />
      <RootStack.Screen name="TwelveWord" component={TwelveWordScreen} />
      <RootStack.Screen
        name="TwelveWordSecond"
        component={TwelveWordSecondScreen}
      />
      <RootStack.Screen
        name="TwelveWordThird"
        component={TwelveWordThirdScreen}
      />
      <RootStack.Screen name="Authenticator" component={AuthenticatorScreen} />
      <RootStack.Screen name="DetailsChart" component={DetailsChartScreen} />
      <RootStack.Screen name="Notification" component={NotificationScreen} />
      <RootStack.Screen
        name="ConvertBuySell"
        component={ConvertBuySellScreen}
      />
      <RootStack.Screen name="Deposit" component={DepositScreen} />
      <RootStack.Screen name="Withdraw" component={WithdrawScreen} />
      <RootStack.Screen name="ListCoinSearch" component={ListCoinSearch} />
      <RootStack.Screen name="DetailCoin" component={DetailCoinScreen} />
      <RootStack.Screen
        name="Identification"
        component={IdentificationScreen}
      />
    </>
  );
};
