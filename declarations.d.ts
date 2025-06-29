declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const API_BASE: string;
  export const API_GOOGLE_CONSOLE_KEY: string;
  export const DSN: string;
  export const CH_PLAY_URL: string;
  export const ONE_SIGNAL: string;
  export const APP_ID_FACEBOOK: string;
  export const CLIENT_ID_GOOGLE: string;
}
