import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { URL, SessionID } from '../configs';

const authAxios = axios.create({
  baseURL: `${URL}`,
  headers: {
    'Content-type': 'application/json',
    sessionid: SessionID,
  },
});
const getID = async () => {
  const id = await AsyncStorage.getItem('resUser');
  const user = JSON.parse(id);
  return user?.id;
};

export const getProfile = async () => {
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
      .get('/public/profile');
    return data;
  } catch (error) {
    return error?.response;
  }
};
