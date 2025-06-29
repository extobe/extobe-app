import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { URL, SessionID } from '../configs';

// const authAxios = axios.create({
//   baseURL: `${URL}`,
//   headers: {
//     'Content-type': 'application/json',
//     sessionid: 'OgPDJR25-6GoTWyTmaPsenYUuw5_Pged',
//   },
// });
const getID = async () => {
  const id = await AsyncStorage.getItem('resUser');
  const user = JSON.parse(id);
  return user?.id;
};

export const create2FA = async () => {
  const ID = await getID();
  try {
    const data = await axios
      .create({
        baseURL: `${URL}`,
        headers: {
          'Content-type': 'application/json',
          sessionid: SessionID,
          id: ID,
        },
      })
      .get('/public/mfa/create2FA');
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const enable2FA = async (
  mfacode: number,
  token: string,
  otpauth_url: string,
) => {
  const ID = await getID();
  try {
    const data = await axios
      .create({
        baseURL: `${URL}`,
        headers: {
          'Content-type': 'application/json',
          sessionid: SessionID,
          id: ID,
        },
      })
      .post('/public/mfa/enable2FA', {
        token,
        mfacode,
        otpauth_url,
      });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const disable2FA = async (token: number, email: string) => {
  const ID = await getID();
  try {
    const data = await axios
      .create({
        baseURL: `${URL}`,
        headers: {
          'Content-type': 'application/json',
          sessionid: SessionID,
          id: ID,
        },
      })
      .post('/public/mfa/disable2FA', {
        token,
        email,
      });
    return data;
  } catch (error) {
    return error?.response;
  }
};
