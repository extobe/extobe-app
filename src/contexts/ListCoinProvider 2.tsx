import React, { createContext, useState } from 'react';

export type ListCoin = {
  listCoin?: any;
  setListCoin?: (listCoin: any) => void;
  charts?: any;
  setCharts?: (charts: any) => void;
};

export const ListCoinContext = createContext<ListCoin>({
  listCoin: null,
  charts: null,
});
export const ListCoinProvider: React.FC = ({ children }) => {
  const [listCoin, setListCoin] = useState<any[]>([]);
  const [charts, setCharts] = useState<any[]>([]);
  const Value = {
    listCoin,
    setListCoin,
    charts,
    setCharts,
  };

  return (
    <ListCoinContext.Provider value={Value}>
      {children}
    </ListCoinContext.Provider>
  );
};
