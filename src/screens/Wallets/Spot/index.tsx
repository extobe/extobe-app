import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { TotalValue } from '../Overview/TotalValue';
import { Main } from './Main';

interface Props {}
export const Spot = ({}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TotalValue />
        <Main />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
