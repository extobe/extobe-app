import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {}
export const NotificationScreen = ({}: Props) => {
  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const data = [
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content:
        'You have login your account from Mac OS 14 and you must be 13000 STF',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
    {
      title: 'Login Notices',
      content: 'You have login your account from Mac OS 14',
      time: '12-02-2022',
    },
  ];
  const listNotifi = data.map((item: any) => {
    return (
      <>
        <View
          style={{ paddingLeft: responsive(30), paddingRight: responsive(20) }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{ ...TextStyles.normalSemiBold, color: colors.BLUETEXT }}
            >
              {item?.title}
            </Text>
            <Text style={{ ...TextStyles.largeCaption, color: colors.GREY }}>
              {item?.time}
            </Text>
          </View>
          <Text
            style={{
              ...TextStyles.normaleRegular,
              marginTop: responsive(3),
              color: colors.BLUETEXT,
            }}
          >
            {item?.content}
          </Text>
        </View>

        <View
          style={{
            height: 1 * StyleSheet.hairlineWidth,
            backgroundColor: colors.GREYSEMI,
            marginTop: responsive(8),
            marginBottom: responsive(20),
          }}
        />
      </>
    );
  });
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewBack}>
          <TouchableOpacity
            onPress={() => {
              navigate('Home');
            }}
          >
            <Image
              source={ICONS.iconBack}
              style={styles.iconBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ ...TextStyles.largeSemiBold, color: colors.BLUETEXT }}>
            Message
          </Text>
          <View />
        </View>
        {listNotifi}
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
  iconBack: {
    height: responsive(18),
    width: responsive(18),
  },
});
