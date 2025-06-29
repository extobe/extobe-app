import React, { useState, useContext } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';

import { MyButton } from '@components/MyButton';

import { RootScreenNavigationProp } from '@navigation/navigator';
import { getProfile } from '@services/Common';
import { activeCharacter, disableCharacter } from '@services/TwelveWord';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

interface Props {}
export const TwelveWordThirdScreen = ({}: Props) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<RootScreenNavigationProp>();

  const arrCharacter = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const auth = useContext(AuthUserContext);

  const arr12character = [
    ...arrCharacter?.character?.character_code?.split(',')!,
  ];
  const [shuffledWord, setShuffledWord] = useState(arr12character);
  const [word, setWord] = useState([]);
  const [wordInput, setWordInput] = useState<string>('');

  const shuffledWords = shuffledWord.sort((a, b) => 0.5 - Math.random());
  const handleClickItem = (item: any) => {
    word.push(item);
    const getWord = shuffledWord.filter((t) => {
      return t !== item;
    });
    setShuffledWord(getWord);
  };

  const handleReturnWord = () => {
    setShuffledWord(arr12character.sort((a, b) => 0.5 - Math.random()));
    setWord([]);
  };
  const characters = auth?.profile?.character_code;

  const getAPIProfile = async () => {
    const res = await getProfile();
    if (res) {
      auth?.setProfile?.(res?.data?.data);
    }
  };

  const submit = async () => {
    if (
      JSON.stringify(word) ===
        JSON.stringify(arrCharacter?.character?.character_code?.split(',')!) ||
      wordInput.split(' ')!.length === 12
    ) {
      if (characters === false) {
        common?.setLoading?.(true);
        const res = await activeCharacter(word.join(','));
        common?.setLoading?.(false);
        if (res?.data?.code === 200) {
          getAPIProfile();
          showMess(t('validation:all.SuccessfulImplementation'), 'success');
          navigate('Security');
        }
      } else {
        common?.setLoading?.(true);
        const res = await disableCharacter(wordInput.split(' ')!.toString());
        common?.setLoading?.(false);
        if (res?.data?.code === 200) {
          getAPIProfile();
          showMess(t('validation:all.SuccessfulImplementation'), 'success');
          navigate('Security');
        }
        if (res?.data?.code === 400) {
          showMess(t('validation:twelveWord.IncorrectCharacters'), 'error');
        }
      }
    } else if (
      JSON.stringify(word) !==
        JSON.stringify(arrCharacter?.character?.character_code?.split(',')!) &&
      characters === false
    ) {
      showMess(t('validation:twelveWord.IncorrectCharacters'), 'error');
    } else if (wordInput.split(' ').length < 12 && characters === true) {
      showMess(t('validation:twelveWord.PleaseEnterAll12Phrases'));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txtSave}>
        {t('screens:twelveWord.VerifyAccountRecoveryPhrases')}
      </Text>
      {characters === false && (
        <>
          <Text style={styles.txtStep}>
            {t('screens:twelveWord.TapTheWordsToPutThemSideBySide')}
          </Text>
          <Text style={styles.txtStep}>
            {t('screens:twelveWord.CorrectOrder')}
          </Text>
        </>
      )}
      {characters === true && (
        <Text style={styles.txtStep}>
          {t('screens:twelveWord.ThereAre12Single')}
        </Text>
      )}

      <View style={styles.view}>
        {characters === false ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              numColumns={4}
              data={word}
              keyExtractor={(_, index) => `key-wordConfirm-${index}`}
              renderItem={({ item }) => {
                return (
                  <View style={styles.views}>
                    <TouchableOpacity>
                      <View style={styles.view12word}>
                        <Text style={styles.txtRglBold}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <TextInput
            value={wordInput}
            onChangeText={(val) => setWordInput(val)}
            style={styles.textIP}
            placeholder={'Enter 12 word'}
            autoCapitalize="none"
          />
        )}
      </View>
      {characters === false && (
        <>
          <View style={{ height: responsive(150) }}>
            <FlatList
              numColumns={4}
              data={shuffledWords}
              keyExtractor={(_, index) => `key-wordConfirm-${index}`}
              renderItem={({ item }) => {
                return (
                  <View style={styles.views}>
                    <TouchableOpacity
                      onPress={() => {
                        handleClickItem(item);
                      }}
                    >
                      <View style={styles.view12word}>
                        <Text style={styles.txtRglBold}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <TouchableOpacity onPress={() => handleReturnWord()}>
            <View style={{ marginTop: responsive(40) }}>
              <Text style={styles.txtStep}>{t('screens:all.TryAgain')}</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      {characters === false && (
        <View>
          {word[11] !== undefined ? (
            <MyButton
              buttonText={t('screens:all.TurnOn')}
              textStyle={{ alignItems: 'center' }}
              onPress={submit}
              style={styles.presChangeColor}
            />
          ) : (
            <MyButton
              buttonText={t('screens:all.TurnOn')}
              textStyle={{ alignItems: 'center' }}
              onPress={() => {
                showMess(
                  t('validation:twelveWord.PleaseEnterAll12Phrases'),
                  'error',
                );
              }}
              style={styles.presChangeColor}
            />
          )}
        </View>
      )}
      {characters === true && (
        <View>
          {wordInput !== undefined ? (
            <MyButton
              buttonText={t('screens:all.TurnOff')}
              textStyle={{ alignItems: 'center' }}
              onPress={submit}
              style={styles.presChangeColor}
            />
          ) : (
            <MyButton
              buttonText={t('screens:all.TurnOff')}
              textStyle={{ alignItems: 'center' }}
              onPress={() => {
                showMess(
                  t('validation:twelveWord.PleaseEnterAll12Phrases'),
                  'error',
                );
              }}
              style={styles.presChangeColor}
            />
          )}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    opacity: 0.92,
    alignItems: 'center',
  },
  view: {
    borderColor: colors.GREEN,
    borderRadius: responsive(12),
    borderWidth: 2.5 * StyleSheet.hairlineWidth,
    height: responsive(150),
    width: responsive(350),
    marginVertical: responsive(25),
    justifyContent: 'center',
  },
  views: {
    flexDirection: 'row',
    paddingLeft: responsive(7),
    marginVertical: responsive(5),
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
  view12word: {
    borderRadius: responsive(25),
    borderColor: colors.GREENBOLD,
    borderWidth: 2.5 * StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive(12),
    paddingVertical: responsive(5),
    marginHorizontal: responsive(5),
  },
  textIP: {
    color: colors.GREYBOLD,
    width: responsive(320),
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
  txtRglBold: {
    color: colors.GREYBOLD,
    ...TextStyles.normaleRegular,
  },
  txtMDUwhite: {
    color: colors.WHITE,
    ...TextStyles.mediumSemiBold,
  },
});
