/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MyButton } from '@components/MyButton';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';
import { IMAGES } from '@assets/images';

interface Props {}
export const TwelveWordScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleContinue = () => {
    if (checked) {
      navigate('TwelveWordSecond');
    } else {
      setChecked(false);
      setModalVisible(true);
    }
  };
  const handleChecked = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txtSave}>
        {t('screens:twelveWord.BackUpYourAccountNow')} !
      </Text>
      <Text style={styles.txtStep}>
        {t('screens:twelveWord.InTheNextStepYouWillSee12WordsFor')}
      </Text>
      <Text style={styles.txtStep}>
        {t('screens:twelveWord.AllowYouToRecoverYourAccount')}
      </Text>
      <Image source={IMAGES.Security} style={styles.imageSecurity} />
      <View style={styles.buttonCheck}>
        <TouchableOpacity onPress={() => handleChecked()}>
          <Image
            source={checked ? ICONS.iconCheckboxActive : ICONS.iconCheckbox}
            style={styles.btnCheck}
          />
        </TouchableOpacity>
        <Text style={styles.txtConfirm}>
          {' '}
          {t('screens:twelveWord.IUnderstandThat')}
        </Text>
      </View>
      <MyButton
        buttonText={t('screens:all.Continue')}
        textStyle={{ alignItems: 'center' }}
        onPress={handleContinue}
        style={styles.button}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={{ color: 'red', ...TextStyles.normalSemiBold }}>
            {t('screens:twelveWord.PleaseConfirmTheInformation')} !
          </Text>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>{t('screens:all.Agree')}</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  modalView: {
    height: responsive(120),
    width: responsive(280),
    position: 'absolute',
    top: responsive(300),
    left: responsive(40),
    margin: responsive(20),
    padding: responsive(15),
    backgroundColor: colors.WHITEGREY,
    opacity: 0.94,
    borderRadius: responsive(20),
    paddingHorizontal: responsive(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: responsive(0),
      height: responsive(2),
    },
    shadowOpacity: responsive(0.25),
    shadowRadius: responsive(4),
    elevation: responsive(5),
  },
  button: {
    borderRadius: responsive(5),
    width: responsive(335),
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    height: responsive(50),
    marginTop: responsive(30),
    marginHorizontal: responsive(22),
  },
  buttonClose: {
    backgroundColor: colors.BLUEBOLD,
    height: responsive(30),
    width: responsive(70),
    justifyContent: 'center',
    borderRadius: responsive(5),
    marginTop: responsive(15),
  },
  buttonCheck: {
    flexDirection: 'row',
    marginTop: responsive(50),
    marginLeft: responsive(10),
    alignItems: 'center',
    paddingHorizontal: responsive(20),
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtSave: {
    color: colors.BLUETEXT,
    ...TextStyles.mediumSemiBold,
    marginTop: responsive(40),
    marginBottom: responsive(20),
  },
  txtStep: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumRegular,
    paddingVertical: responsive(3),
  },
  txtConfirm: {
    color: colors.GREYBOLD,
    ...TextStyles.normaleRegular,
  },
  btnCheck: {
    width: responsive(20),
    height: responsive(20),
    marginRight: responsive(5),
  },
  imageSecurity: {
    width: responsive(414),
    height: responsive(250),
    marginTop: responsive(60),
  },
});
