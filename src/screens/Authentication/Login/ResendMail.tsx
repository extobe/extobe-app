/* eslint-disable @typescript-eslint/no-shadow */
import React, { useContext } from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import { AuthUserContext } from '@contexts/AuthUserProvider';
import { CommonContext } from '@contexts/Common';
import { useTranslation } from 'react-i18next';

import ModalOpacity from '@components/Modal/ModalOpacity';

import { resendMail } from '@services/Auth';
import { colors, responsive, TextStyles } from '@styles';
import { showMess } from '@utils/Helper';

import { ICONS } from '@assets/icons';

export type Props = {
  visible: any;
  dismiss: () => void;
};
const ResendMail: React.FC<Props> = ({ visible, dismiss }) => {
  const { t } = useTranslation();

  const auth = useContext(AuthUserContext);
  const common = useContext(CommonContext);
  const time = Date.now();

  const sendMail = async () => {
    common?.setLoading?.(true);
    const res = await resendMail(auth?.email, time);
    common?.setLoading?.(false);
    if (res?.data) {
      if (res?.data?.code === 200) {
        showMess(t('validation:all.SuccessfulImplementation'), 'success');
        common?.setTimeCountDown?.(60);
        dismiss();
      }
    }
  };
  return (
    <View style={styles.container}>
      <ModalOpacity visible={visible} dismiss={dismiss}>
        <View style={styles.modalViews}>
          <View style={styles.view}>
            <Text style={styles.txtTitle}>{t('screens:login.ResendMail')}</Text>
            <TouchableNativeFeedback
              onPress={() => {
                dismiss();
              }}
            >
              <Image
                source={ICONS.iconClose}
                style={styles.iconClose}
                resizeMode="contain"
              />
            </TouchableNativeFeedback>
          </View>
          <View style={styles.viewEmails}>
            <Text style={styles.txtEmail}>{auth?.email}</Text>
          </View>
          <TouchableOpacity onPress={sendMail}>
            <View style={styles.viewButtonSendmail}>
              {common?.loading === false ? (
                <Text style={styles.txtButtonREGISTERS}>
                  {' '}
                  {t('screens:all.Resend')}
                </Text>
              ) : (
                <ActivityIndicator size="small" color={colors.WHITE} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ModalOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalViews: {
    height: responsive(220),
    left: responsive(14),
    position: 'absolute',
    shadowColor: colors.GREYBOLD,
    shadowOpacity: responsive(0.5),
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: responsive(5),
    borderRadius: responsive(7),
    width: responsive(345),
  },
  viewEmails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsive(15),
    height: responsive(45),
    borderRadius: responsive(5),
    borderWidth: 5 * StyleSheet.hairlineWidth,
    borderColor: colors.GREEN,
    marginTop: responsive(10),
    marginLeft: responsive(20),
    width: responsive(305),
  },
  viewButtonSendmail: {
    alignItems: 'center',
    height: responsive(45),
    width: responsive(150),
    borderRadius: responsive(7),
    marginLeft: responsive(95),
    justifyContent: 'center',
    marginTop: responsive(50),
    backgroundColor: colors.GREEN,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtButtonREGISTERS: {
    ...TextStyles.mediumBold,
    color: colors.WHITE,
    marginTop: responsive(2),
  },
  txtTitle: {
    ...TextStyles.normalSemiBold,
    color: colors.GREYBOLD,
    marginLeft: responsive(20),
    marginVertical: responsive(10),
  },
  txtEmail: {
    ...TextStyles.normalSemiBold,
    color: colors.GREYSEMI,
  },
  iconClose: {
    height: responsive(15),
    width: responsive(15),
    marginRight: responsive(20),
  },
});
export default ResendMail;
