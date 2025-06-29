/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

export const useSocketExchangeBuySell = () => {
  const [dataCharts, resDataCharts] = useState<any>();

  var ws = useRef(
    new WebSocket(
      'wss://testapi.extobe.com:3099/trade?marketName=BTC_USDT&depth',
    ),
  ).current;

  useEffect(() => {
    // ws.onmessage = (e) => {
    //   console.log('connn----------', e.data);
    //   // console.log('456----------');
    //   const data = JSON.parse(e.data);
    //   if (data?.hasOwnProperty('data')) {
    //     resDataCharts(data?.data);
    //   }
    // };
  }, []);

  // socket.onerror = (e) => {
  //   // an error occurred
  //   // console.log(e.message);
  // };

  // socket.onclose = (e) => {
  //   // connection closed
  //   // console.log(e);
  // };
  return { dataCharts };
};
