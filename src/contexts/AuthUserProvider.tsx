import React, { createContext, useState } from 'react';

import { TwelveWord } from '@types';

export type Auth = {
  isAuth?: boolean;
  setAuth?: (isAuth: boolean) => void;
  profile?: any;
  setProfile?: (listCoin: any) => void;
  email?: string | null;
  setEmail?: (email: string) => void;
  character?: TwelveWord;
  setCharacter?: (character: TwelveWord) => void;
};

export const AuthUserContext = createContext<Auth>({
  isAuth: false,
  profile: null,
  email: null,
  character: {},
});
export const AuthUserProvider: React.FC = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [profile, setProfile] = useState<any | null>(null);
  const [email, setEmail] = useState<string>();
  const [character, setCharacter] = useState<TwelveWord>();
  const authValue = {
    isAuth,
    setAuth,
    profile,
    setProfile,
    email,
    setEmail,
    character,
    setCharacter,
  };
  return (
    <AuthUserContext.Provider value={authValue}>
      {children}
    </AuthUserContext.Provider>
  );
};
