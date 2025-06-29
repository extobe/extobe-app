/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export type Props = {
  visible: any;
  dismiss: () => void;
  children: any;
};
const ModalOpacity: React.FC<Props> = ({ visible, dismiss, children }) => {
  return (
    <View>
      <Modal animationType="fade" transparent visible={visible}>
        <TouchableWithoutFeedback
          onPress={() => {
            dismiss();
          }}
        >
          <View style={styles.view} />
        </TouchableWithoutFeedback>
        <View style={styles.views} pointerEvents="box-none">
          {children}
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
  },
});
export default ModalOpacity;
