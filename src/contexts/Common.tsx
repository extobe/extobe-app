import React, { createContext, useState } from 'react';

import { ICountry } from '@types';

export type Common = {
  loading?: boolean;
  setLoading?: (listCoin: boolean) => void;
  timeCountDown?: number;
  setTimeCountDown?: (timeCountDown: number) => void;
  listCountry?: ICountry[];
  setlistCountry?: (listCountry: ICountry[]) => void;
};

export const CommonContext = createContext<Common>({
  loading: false,
  listCountry: [],
  timeCountDown: 60,
});
export const CommonProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState<number>(60);
  const [listCountry, setlistCountry] = useState<ICountry[]>([]);
  const Value = {
    loading,
    setLoading,
    listCountry,
    setlistCountry,
    timeCountDown,
    setTimeCountDown,
  };

  return (
    <CommonContext.Provider value={Value}>{children}</CommonContext.Provider>
  );
};
