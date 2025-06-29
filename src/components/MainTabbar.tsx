import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';

import { colors, responsive } from '@styles';

import { TAB_BAR } from '../configs';

const PADDING_HEIGHT = Platform.OS === 'ios' ? responsive(20) : 0;
const HEIGHT = Platform.OS === 'ios' ? responsive(80) : responsive(70);
const MainTab = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            key={`tabbar-${route.key}`}
            style={styles.views}
          >
            <Image
              source={
                isFocused ? TAB_BAR[index]?.imageActive : TAB_BAR[index]?.image
              }
              style={index === 2 ? styles.imageActive : styles.image}
              resizeMode="contain"
            />
            {isFocused ? (
              <Text style={styles.txtBlue}>{index === 2 ? null : label}</Text>
            ) : (
              <Text style={styles.txtGrey}>{index === 2 ? null : label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default MainTab;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: HEIGHT,
    elevation: 2,
    paddingBottom: PADDING_HEIGHT,
  },
  views: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBlue: {
    color: colors.BLUEBOLD,
    fontSize: responsive(12),
  },
  txtGrey: {
    color: colors.GREY,
    fontSize: responsive(12),
  },
  image: {
    width: responsive(20),
    height: responsive(20),
    marginBottom: responsive(4),
  },
  imageActive: {
    width: responsive(50),
    height: responsive(50),
    marginTop: responsive(20),
  },
});
