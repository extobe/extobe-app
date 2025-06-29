import React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import { FirstContent } from '@screens/Home/FirstContent';
import { HeaderHome } from '@screens/Home/Header';
import { SecondContent } from '@screens/Home/SecondContent';
import { ThirdContent } from '@screens/Home/ThirdContent';

interface Props {}
export const HomeScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderHome />
        <FirstContent />
        <SecondContent />
        <ThirdContent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
