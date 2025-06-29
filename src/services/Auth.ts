import axios from 'axios';

import { URL, SessionID } from '../configs';

const authAxios = axios.create({
  baseURL: `${URL}`,
  headers: {
    'Content-type': 'application/json',
    sessionid: SessionID,
  },
});

export const login = async (
  email: any,
  password: any,
  time_received_otp: any,
) => {
  try {
    const data = await authAxios.post('/public/signin', {
      email,
      password,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const loginByPhone = async (
  phone: string,
  password: any,
  time_received_otp: any,
) => {
  try {
    const data = await authAxios.post('/public/signin', {
      phone,
      password,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const login2FA = async (email: string, token: number) => {
  try {
    const data = await authAxios.post('/public/signin-mfa', {
      token,
      email,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const login2FAByPhone = async (phone: number, token: number) => {
  try {
    const data = await authAxios.post('/public/signin-mfa', {
      token,
      phone,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const login12Character = async (
  character_code: string,
  time_received: number,
) => {
  try {
    const data = await authAxios.post('/public/signin-character', {
      character_code,
      time_received,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const Verify = async (
  email: any,
  activation_code: any,
  time_received_otp: any,
) => {
  try {
    const data = await authAxios.post('/public/verify', {
      email,
      activation_code,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const VerifyByPhone = async (
  phone: number,
  activation_code: any,
  time_received_otp: any,
) => {
  try {
    const data = await authAxios.post('/public/verify', {
      phone,
      activation_code,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const forgotPassword = async (email: any, time_received_otp: any) => {
  try {
    const data = await authAxios.post('/public/password/forgot', {
      email,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const forgotPasswordBy12Character = async (
  character_code: string,
  time_received: number,
) => {
  try {
    const data = await authAxios.post(
      '/public/character-code/forgot/password',
      {
        character_code,
        time_received,
      },
    );
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const newPassword = async (email: any, password: any) => {
  try {
    const data = await authAxios.post('/public/password/forgot/generate', {
      email,
      password,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const register = async (
  email: any,
  password: any,
  phone: any,
  ref: any,
  time_expired_otp: any,
) => {
  try {
    const data = await authAxios.post('/register', {
      email,
      password,
      phone,
      ref,
      time_expired_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};
export const registerVerify = async (
  email: any,
  activation_code: any,
  time_received_otp: any,
) => {
  try {
    const data = await authAxios.post('register/verify', {
      email,
      activation_code,
      time_received_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};

export const resendMail = async (email: any, time_expired_otp: any) => {
  try {
    const data = await authAxios.post('/public/resend-OTP', {
      email,
      time_expired_otp,
    });
    return data;
  } catch (error) {
    return error?.response;
  }
};

export const listCountry = async () => {
  try {
    const data = await authAxios.get('/public/country/list');
    return data;
  } catch (error) {
    return error?.response;
  }
};
