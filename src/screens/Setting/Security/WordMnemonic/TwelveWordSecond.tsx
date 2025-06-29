/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { TwelveWordContext } from '@contexts/TwelveWordProvider';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { createCharacter } from '@services/TwelveWord';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

import { ICONS } from '@assets/icons';

interface Props {}
export const TwelveWordSecondScreen = ({}: Props) => {
  const { t } = useTranslation();
  const auth = useContext(AuthUserContext);
  // const data = useContext(TwelveWordContext);
  const common = useContext(CommonContext);

  const { navigate } = useNavigation<RootScreenNavigationProp>();
  const characters = auth?.profile?.character_code;

  const CreateCharacter = async () => {
    common?.setLoading?.(true);
    const res = await createCharacter();
    common?.setLoading?.(false);
    if (res) {
      auth?.setCharacter?.(res?.data?.data);
    }
  };
  useEffect(() => {
    // if (characters === false) {
    CreateCharacter();
    // }
  }, []);

  const handleContinue = () => {
    navigate('TwelveWordThird');
  };
  const arrCharacter =
    auth?.character === undefined
      ? []
      : auth?.character?.character_code?.split(',');
  const handleCopy = () => {
    Clipboard.setString(arrCharacter?.toString());
    showMess(t('validation:all.CopyCodeSuccessful'), 'success');
  };

  const renderItem = arrCharacter?.map((item: string, index: number) => {
    return (
      <View style={styles.view12word}>
        <Text style={styles.txt12word}>{index + 1}. </Text>
        <Text style={styles.txtTitle}>{item}</Text>
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <Text style={styles.txtSave}>
        {t('screens:twelveWord.YourAccountRecoveryPhrase')}
      </Text>
      <Text style={styles.txtStep}>{t('screens:login.ByPhoneNumber')}</Text>
      <Text style={styles.txtStep}>
        {t('screens:twelveWord.inTheCorrectOrder')}
      </Text>
      {characters === false && (
        <View style={styles.viewCharacter}>{renderItem}</View>
      )}
      {characters === true && (
        <View style={styles.viewCharacterDisable}>
          <Text style={styles.txtMDU}>
            {t('screens:twelveWord.YouHaveEnabled12Characters')}
          </Text>
          <Text style={styles.txtMDU}>
            {t('screens:twelveWord.IfYouWantToDisable')}
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={handleCopy}>
        <View style={styles.viewCopy}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={ICONS.iconCopy} style={styles.icon} />
            <Text style={styles.txtWhite}>{t('screens:all.Copy')}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Image source={ICONS.iconWarning} style={styles.imageWarning} />
      <Text style={styles.txtSteps}>
        {t('screens:twelveWord.NeverShareRecoveryPhrasesWith')}{' '}
      </Text>
      <Text style={styles.txtSteps}>
        {t('screens:twelveWord.AnyoneHaveToKeepThem')}!
      </Text>
      <TouchableOpacity onPress={() => handleContinue()}>
        <View style={styles.presChangeColor}>
          <Text style={styles.txtWhite}>{t('screens:all.Continue')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  presChangeColor: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: responsive(12),
    marginTop: responsive(25),
    height: responsive(50),
    width: responsive(330),
    borderRadius: responsive(25),
    backgroundColor: colors.GREEN,
    alignItems: 'center',
  },
  viewCharacter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsive(30),
    justifyContent: 'center',
  },
  viewCharacterDisable: {
    marginVertical: responsive(40),
    alignItems: 'center',
    marginHorizontal: responsive(20),
    borderRadius: responsive(15),
    borderColor: colors.GREEN,
    borderWidth: 2.5 * StyleSheet.hairlineWidth,
    paddingHorizontal: responsive(8),
    paddingVertical: responsive(15),
  },
  view12word: {
    borderRadius: responsive(15),
    borderColor: colors.GREEN,
    borderWidth: 2.5 * StyleSheet.hairlineWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive(5),
    paddingHorizontal: responsive(10),
    marginHorizontal: responsive(5),
    marginVertical: responsive(6),
  },
  viewCopy: {
    flexDirection: 'row',
    marginTop: responsive(50),
    alignItems: 'center',
    borderRadius: responsive(5),
    justifyContent: 'space-between',
    backgroundColor: colors.GREYSEMI,
    paddingHorizontal: responsive(10),
    height: responsive(40),
  },
  txtSave: {
    color: colors.GREEN,
    ...TextStyles.mediumSemiBold,
    paddingVertical: responsive(20),
  },

  txtStep: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumRegular,
    paddingVertical: responsive(3),
  },
  txtSteps: {
    color: 'red',
    ...TextStyles.mediumRegular,
    paddingVertical: responsive(3),
  },
  txtConfirm: {
    color: colors.GREENBOLD,
    ...TextStyles.normalSemiBold,
  },
  txt12word: {
    color: colors.DARK,
    ...TextStyles.normaleRegular,
  },
  txtTitle: {
    color: colors.GREYBOLD,
    ...TextStyles.normalSemiBold,
  },
  txtWhite: {
    ...TextStyles.mediumSemiBold,
    color: colors.WHITE,
  },
  txtMDU: {
    color: colors.GREYBOLD,
    ...TextStyles.mediumSemiBold,
  },
  imageWarning: {
    height: responsive(50),
    width: responsive(50),
    marginTop: responsive(70),
  },
  icon: {
    height: responsive(30),
    width: responsive(30),
    borderRadius: responsive(5),
    marginRight: responsive(5),
  },
});
