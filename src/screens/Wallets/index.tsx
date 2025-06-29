import React, { useRef, useState } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { colors, responsive, TextStyles } from '@styles';

import { TAB_ASSETS } from '../../configs';
import { Overview } from './Overview';
import { Spot } from './Spot';

interface Props {}
export const WalletsScreen = ({}: Props) => {
  const [active, setActive] = useState(0);
  const data = TAB_ASSETS.map((item) => {
    return {
      ...item,
    };
  });
  const translateX = useRef(new Animated.Value(0)).current;

  const handleSlide = (type: number) => {
    Animated.timing(translateX, {
      toValue: type,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: responsive(15) }}>
        <FlatList
          data={data}
          keyExtractor={(_, index) => `key-list-history${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setActive(item?.id);
                    handleSlide(responsive(69.5) * item?.id);
                  }}
                >
                  <View style={styles.activeBG}>
                    <Text
                      style={
                        active === item?.id
                          ? {
                              ...styles.txtTab,
                              color: colors.WHITE,
                            }
                          : styles.txtTab
                      }
                    >
                      {item?.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <Animated.View
        style={{
          ...styles.viewActive,
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
      {/* <View
          style={{
            height: responsive(10),
            backgroundColor: colors.WHITELIGHT,
            marginBottom: responsive(10),
          }}
        /> */}
      {active === 0 && (
        <View
          style={{
            marginTop: responsive(10),
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Overview />
          </ScrollView>
        </View>
      )}
      {active === 1 && (
        <View
          style={{
            marginTop: responsive(10),
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Spot />
          </ScrollView>
        </View>
      )}
      {active === 2 && (
        <View
          style={{
            marginTop: responsive(20),
            paddingHorizontal: responsive(15),
          }}
        />
      )}
      {active === 3 && (
        <View
          style={{
            marginTop: responsive(20),
            paddingHorizontal: responsive(15),
          }}
        />
      )}
      {active === 4 && (
        <View
          style={{
            marginTop: responsive(20),
            paddingHorizontal: responsive(15),
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  activeBG: {
    alignItems: 'center',
    height: responsive(28),
    width: responsive(69),
    justifyContent: 'center',
  },
  viewActive: {
    position: 'absolute',
    zIndex: -1,
    height: responsive(28),
    width: responsive(69.5),
    backgroundColor: colors.GREEN,
    borderRadius: responsive(20),
    left: responsive(15),
  },
  txtTab: {
    color: colors.BLUETEXT,
    ...TextStyles.normalSemiBold,
  },
});
