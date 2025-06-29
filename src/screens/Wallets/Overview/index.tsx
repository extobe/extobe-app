import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { colors, responsive } from '@styles';

import { Main } from './Main';
import { TotalValue } from './TotalValue';

interface Props {}
export const Overview = ({}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TotalValue />
        <View style={styles.borderView} />
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
  borderView: {
    paddingHorizontal: responsive(20),
    borderTopRightRadius: responsive(22),
    borderTopLeftRadius: responsive(22),
    backgroundColor: 'white',
    width: '100%',
    height: responsive(30),
    position: 'absolute',
    top: responsive(250),
  },
});
