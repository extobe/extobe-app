import React, { createContext, useState } from 'react';

export type ListCoin = {
  listCoin?: any;
  setListCoin?: (listCoin: any) => void;
};

export const ListCoinContext = createContext<ListCoin>({
  listCoin: null,
});
export const ListCoinProvider: React.FC = ({ children }) => {
  const [listCoin, setListCoin] = useState<any[]>([]);
  const Value = {
    listCoin,
    setListCoin,
  };

  return (
    <ListCoinContext.Provider value={Value}>
      {children}
    </ListCoinContext.Provider>
  );
};
