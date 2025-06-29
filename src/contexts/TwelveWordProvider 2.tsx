import React, { createContext, useState } from 'react';

export type TwelveWord = {
  character?: any;
  setCharacter?: (character: any) => void;
};

export const TwelveWordContext = createContext<TwelveWord>({
  character: null,
});
export const TwelveWordProvider: React.FC = ({ children }) => {
  const [character, setCharacter] = useState('');
  const Value = {
    character,
    setCharacter,
  };
  return (
    <TwelveWordContext.Provider value={Value}>
      {children}
    </TwelveWordContext.Provider>
  );
};
