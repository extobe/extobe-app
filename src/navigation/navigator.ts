import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

export type TabStackParamList = {
  Home: undefined;
  Markets: undefined;
  Trades: undefined;
  Futures: undefined;
  Wallets: undefined;
};
export type T = keyof TabStackParamList;
export type AuthStackParamList = {
  Login: undefined;
};
export type TabStackScreenProps<RouteName extends T> = BottomTabScreenProps<
  TabStackParamList,
  RouteName
>;
export type TabStackNavigation = BottomTabNavigationProp<TabStackParamList>;

export type RootStackParamList = {
  MainTab: undefined;
  Slash: undefined;
  Welcome: undefined;
  Login:
    | {
        country: Object;
      }
    | undefined;
  Register:
    | {
        country: Object;
      }
    | undefined;
  SelectLanguage:
    | {
        id: number;
      }
    | undefined;
  CurrentLocation:
    | {
        country: Object;
      }
    | undefined;
  Verification:
    | {
        id: number;
      }
    | undefined;
  NewPassWord: undefined;
  Setting: undefined;
  Security: undefined;
  SettingSecond: undefined;
  TwelveWord: undefined;
  TwelveWordSecond: undefined;
  TwelveWordThird: undefined;
  Authenticator: undefined;
  WordMnemonic: undefined;
  DetailsChart: undefined;
  Notification: undefined;
  Deposit: undefined;
  Withdraw: undefined;
  ListCoinSearch: undefined;
  Identification: undefined;
  ConvertBuySell: {
    flat: boolean;
  };
  DetailCoin:
    | {
        data: Object;
      }
    | undefined;
};
export type RootBottomtabParamList = {
  user: undefined;
  Trade: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();

export type RootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  BottomTabNavigationProp<RootBottomtabParamList>
>;

export type RootScreenRouteProp = RouteProp<RootStackParamList>;
export type RootScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  StackNavigationProp<RootStackParamList>
>;
