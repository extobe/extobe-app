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

export const createCharacter = async () => {
  try {
    const data = await authAxios.get('/public/character-code/create');
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const activeCharacter = async (character_code: string) => {
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
      .post('/public/character-code/enable', {
        character_code,
      });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const disableCharacter = async (character_code: string) => {
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
      .post('/public/character-code/disable', {
        character_code,
      });
    return data;
  } catch (error) {
    return error?.response;
  }
};
