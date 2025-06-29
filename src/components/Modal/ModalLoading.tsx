/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';

import { View, Modal, StyleSheet } from 'react-native';

import { CommonContext } from '@contexts/Common';
import Spinner from 'react-native-spinkit';

import { colors } from '@styles';

interface Props {}
const ModalLoading = ({}: Props) => {
  const common = useContext(CommonContext);
  return (
    <View>
      <Modal animationType="fade" transparent visible={common?.loading}>
        <View style={styles.view} />
        <View style={styles.views} pointerEvents="box-none">
          <Spinner type="Wave" size={60} color={colors.GREEN} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  views: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ModalLoading;
