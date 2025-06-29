import React from 'react';

import { StyleSheet, View } from 'react-native';

import { ComingSoon } from '@components/ComingSoon';

interface Props {}
export const FuturesScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <ComingSoon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
