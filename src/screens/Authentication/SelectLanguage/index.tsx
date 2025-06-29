/* eslint-disable @typescript-eslint/no-shadow */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { CommonContext } from '@contexts/Common';
import { useNavigation } from '@react-navigation/native';
import { ICountry } from '@types';
import { useTranslation } from 'react-i18next';
import { createFilter } from 'react-native-search-filter';

import { RootNavigationProp, RootScreenRouteProp } from '@navigation/navigator';
import { listCountry } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';

import { ICONS } from '@assets/icons';

interface Props {
  route: RootScreenRouteProp;
}
export const SelectLanguageScreen = ({ route }: Props) => {
  const idFlatLanguage = route?.params?.id;

  const { t } = useTranslation();
  const { navigate } = useNavigation<RootNavigationProp>();
  const common = useContext(CommonContext);

  const [valueSearch, setValueSearch] = useState<string>('');

  const handleSelect = (item: Object) => {
    if (idFlatLanguage === 1) {
      navigate('Login', { country: item });
    } else if (idFlatLanguage === 2) {
      navigate('Register', { country: item });
    } else if (idFlatLanguage === 3) {
      navigate('CurrentLocation', { country: item });
    }
  };
  const backLogin = () => {
    if (idFlatLanguage === 1) {
      navigate('Login');
    } else if (idFlatLanguage === 2) {
      navigate('Register');
    } else if (idFlatLanguage === 3) {
      navigate('CurrentLocation');
    }
  };
  const callListCountry = async () => {
    common?.setLoading?.(true);
    const res = await listCountry();
    common?.setLoading?.(false);
    if (res) {
      common?.setlistCountry?.(res?.data?.data);
    }
  };
  useEffect(() => {
    callListCountry();
  }, []);

  const datas = common?.listCountry === undefined ? [] : common?.listCountry;
  const dataSearch = datas.filter(createFilter(valueSearch, ['country_name']));
  const data = dataSearch?.map((item: ICountry) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelect(item);
        }}
        style={styles.viewCountry}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={item?.path ? { uri: item?.path } : null}
            style={styles.imageCountry}
            resizeMode="contain"
          />
          <Text style={styles.txtTitle}>{item?.country_name}</Text>
        </View>
        {idFlatLanguage !== 3 && (
          <Text style={styles.txtNumber}>{item?.phone_code}</Text>
        )}
      </TouchableOpacity>
    );
  });
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.view}>
          <View style={styles.viewSearch}>
            <Image
              source={ICONS.iconSearch}
              style={styles.imageSearch}
              resizeMode="contain"
            />
            <TextInput
              placeholder={t('screens:selectCountry.SearchCountry')}
              value={valueSearch}
              onChangeText={(t) => setValueSearch(t)}
              style={styles.txtInputSearch}
              placeholderTextColor={colors.GREYSEMI}
            />
          </View>
          <TouchableOpacity onPress={backLogin}>
            <Text style={styles.txtCancel}>{t('screens:all.Cancel')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.txtLocation}>
          {t('screens:selectCountry.Country')}/
          {t('screens:selectCountry.Region')}
        </Text>
        <View style={styles.viewLine} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: responsive(200) }}>{data}</View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: responsive(20),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: responsive(20),
  },
  viewSearch: {
    height: responsive(32),
    width: responsive(280),
    backgroundColor: colors.WHITEGREY,
    borderRadius: responsive(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewLine: {
    backgroundColor: colors.WHITEGREY,
    width: responsive(335),
    height: responsive(3),
    marginTop: responsive(5),
  },
  viewCountry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsive(15),
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  txtInputSearch: {
    height: responsive(33),
    width: responsive(220),
  },
  txtCancel: {
    color: colors.GREEN,
    marginLeft: responsive(10),
    ...TextStyles.normalSemiBold,
  },
  txtLocation: {
    color: colors.GREYBOLD,
    marginTop: responsive(15),
    ...TextStyles.normalSemiBold,
  },
  txtTitle: {
    color: colors.GREYBOLD,
    marginLeft: responsive(5),
    ...TextStyles.normaleRegular,
  },
  txtNumber: {
    color: colors.GREYBOLD,
    ...TextStyles.normalSemiBold,
  },
  imageSearch: {
    height: responsive(16.5),
    width: responsive(15),
    marginLeft: responsive(10),
    marginRight: responsive(3),
  },
  imageCountry: {
    height: responsive(20),
    width: responsive(20),
    marginRight: responsive(3),
  },
});
