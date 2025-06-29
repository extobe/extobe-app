/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';

import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Indicator from '@components/Home/Intro/Indicator';

import { RootNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { introSlide } from '../../../configs/intro';

const { width } = Dimensions.get('window');

export type Props = {
  scrollX: any;
};

export const WelcomeScreen = ({}: Props) => {
  const { t, i18n } = useTranslation();
  const { navigate } = useNavigation<RootNavigationProp>();

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const time = React.useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChangedHandler = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }, []);

  useEffect(() => {
    if (currentIndex === 2) {
      return Animated.timing(time, {
        toValue: 2,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else {
      time.setValue(0);
    }
  }, [currentIndex, time]);
  const marginTop = time.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1000, 30, 30],
  });

  const openLogin = () => {
    navigate('Login');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{ alignItems: 'center' }}>
        <Animated.FlatList
          horizontal
          pagingEnabled
          data={introSlide}
          scrollEventThrottle={32}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChangedHandler}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width,
                  padding: responsive(20),
                  alignItems: 'center',
                }}
              >
                <Image
                  source={item?.image}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View
                  style={{ marginTop: responsive(30), alignItems: 'center' }}
                >
                  <Text style={styles.txtTitle}>
                    {i18n.language === 'en' ? item.title : item?.titleVN}
                  </Text>
                  <Text style={styles.txtDescription}>
                    {i18n.language === 'en'
                      ? item.description
                      : item.descriptionVN}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
      {currentIndex === 2 && (
        <TouchableOpacity onPress={openLogin}>
          <Animated.View style={[styles.viewButton, { marginTop }]}>
            <Text style={{ color: colors.WHITE, ...TextStyles.largeSemiBold }}>
              {t('screens:all.ExperienceNow')}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007C91',
  },
  viewButton: {
    alignItems: 'center',
    width: responsive(246),
    height: responsive(52),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    borderRadius: responsive(5),
    marginLeft: responsive(64),
  },
  txtTitle: {
    ...TextStyles.heading3,
    marginBottom: responsive(10),
    color: colors.GREEN,
  },
  txtDescription: {
    ...TextStyles.mediumRegular,
    color: colors.WHITE,
  },
  image: {
    height: responsive(290),
    width: responsive(250),
    marginTop: responsive(90),
  },
});
