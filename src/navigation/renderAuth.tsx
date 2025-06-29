import React from 'react';

import {
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
  SelectLanguageScreen,
  CurrentLocationScreen,
  VerificationScreen,
  NewPassWord,
  WordMnemonicScreen,
} from '@screens/Authentication';

import { RootStack } from './navigator';

export const renderAuth = () => {
  return (
    <>
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="Verification" component={VerificationScreen} />
      <RootStack.Screen name="NewPassWord" component={NewPassWord} />
      <RootStack.Screen
        name="SelectLanguage"
        component={SelectLanguageScreen}
      />
      <RootStack.Screen
        name="CurrentLocation"
        component={CurrentLocationScreen}
      />
      <RootStack.Screen name="WordMnemonic" component={WordMnemonicScreen} />
    </>
  );
};
