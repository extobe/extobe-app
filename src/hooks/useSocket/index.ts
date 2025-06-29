/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

export const useSocket = () => {
  const [dataCharts, resDataCharts] = useState<any>([]);
  const [dataChartsNews, resDataChartsNews] = useState<any>();

  var ws = useRef(new WebSocket('wss://testapi.extobe.com:3099')).current;

  useEffect(() => {
    console.log('123----------');
    // socket.connect();
    ws.onopen = () => {
      let time = Date.now();
      let data = {
        cmd: 'req',
        // args: [`candle.${times}.${typeCoins}`, 414, time],
        args: ['candle.M1.btcusdt', 414, time],
        sessionID: 'iIA1W8YSKmUbIqEXAFAPivOYwlkElINP',
      };
      ws.send(JSON.stringify(data));
    };

    ws.onmessage = (e) => {
      console.log('connn----------', e.data);
      const data = JSON.parse(e.data);
      if (data?.hasOwnProperty('data')) {
        resDataCharts(data?.data);
      }
      if (data?.hasOwnProperty('base_vol')) {
        resDataChartsNews(data);
      }
    };
  }, []);

  // ws.onerror = (e) => {
  //   // an error occurred
  //   console.log(e.message);
  // };

  // socket.onclose = (e) => {
  //   // connection closed
  //   // console.log(e);
  // };
  return { dataCharts, dataChartsNews };
};
