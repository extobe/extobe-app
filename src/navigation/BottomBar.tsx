import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FuturesScreen } from '@screens/Futures';
import { HomeScreen } from '@screens/Home';
import { MarketsScreen } from '@screens/Markets';
import { TradesScreen } from '@screens/Trades';
import { WalletsScreen } from '@screens/Wallets';

import MainTabbar from '../components/MainTabbar';
import { TabStackParamList } from './navigator';

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MainTabbar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Markets" component={MarketsScreen} />
      <Tab.Screen name="Trades" component={TradesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Futures" component={FuturesScreen} />
      <Tab.Screen name="Wallets" component={WalletsScreen} />
    </Tab.Navigator>
  );
}
