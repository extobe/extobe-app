/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-sparse-arrays */
import React, { useEffect, useState } from 'react';

import {
  Image,
  processColor,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { CandleStickChart } from 'react-native-charts-wrapper';
import Spinner from 'react-native-spinkit';

import { useSocket } from '@hooks/useSocket';
import { colors, responsive, TextStyles } from '@styles';

import { Header } from './Header';
import { InforBuySell } from './InforBuySell';

import { ICONS } from '@assets/icons';

interface Props {}
export const DetailsChartScreen = ({}: Props) => {
  const { dataCharts, dataChartsNews } = useSocket();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataCharts?.length > 100) {
      setData(dataCharts);
    }
  }, [dataCharts]);

  console.log('====================================');
  console.log({ dataCharts });
  console.log('====================================');

  const [option, setOption] = useState<any>();
  useEffect(() => {
    const lastID = data[data?.length - 1]?.id;
    const lastItem = data?.length - 1;

    if (dataChartsNews?.id === lastID) {
      data?.splice(lastItem, 1, dataChartsNews);
    } else {
      data?.shift();
      data.push(dataChartsNews);
    }
    const dataFake = [
      {
        date: parseFloat('2018-10-19'),
        open: 0,
        shadowL: 0,
        shadowH: 0,
        close: 0,
      },
    ];
    const fills = data
      ?.slice(data?.length - 41, dataCharts?.length - 0)
      ?.map(
        (item: {
          base_vol: any;
          count: any;
          id: any;
          quote_vol: any;
          type: any;
          seq: any;
          high: number;
          low: number;
          open: number;
          close: number;
          time: number;
        }) => {
          // console.log(item);
          // const date = new Date(item?.time * 1000);
          return {
            close: item?.close,
            open: item?.open,
            shadowL: item?.low,
            shadowH: item?.high,
            date: item?.time,
          };
        },
      );
    const dataNews = fills?.length > 0 ? fills : dataFake;
    setOption({
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true,
        textColor: '#2c3e50',
      },
      data: {
        dataSets: [
          {
            values: dataNews,
            label: 'ExTobe',
            textSize: 100,
            config: {
              highlightColor: processColor(colors.BLUETEXT),
              shadowColor: processColor(colors.BLUETEXT),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor(colors.GREEN),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor(colors.ERROR),
              drawValues: true,
              colors: [processColor('red')],
            },
          },
        ],
      },
      xAxis: {
        enabled: true,
        drawLabels: true,
        drawGridLines: true,
        gridColor: processColor(colors.WHITELIGHT),
        textColor: processColor(colors.GREYBOLD),
        gridLineWidth: 1,
        // valueFormatter: Moment(),
        valueFormatter: 'date',
        valueFormatterPattern: 'HH:mm',
        position: 'BOTTOM',
        labelCount: 2,
        granularity: 1,
        granularityEnabled: true,
        // timeUnit: 'SECONDS',
      },
      yAxis: {
        right: {
          enabled: true,
          gridColor: processColor(colors.WHITELIGHT),
          textColor: processColor(colors.GREYBOLD),
          drawGridLines: true,
          gridLineWidth: 1,
          labelCount: 4,
          valueFormatter: '###,###,###',
        },
        left: {
          enabled: false,
        },
      },
      marker: {
        enabled: true,
        markerColor: processColor(colors.GREYLIGHT),
        textColor: processColor(colors.ERROR),
        textSize: 13,
      },
      zoomXValue: {
        $set: 99999,
      },
    });
  }, [dataChartsNews]);

  const handleSelect = (event: any) => {
    let entry = event.nativeEvent;
    if (entry == null) {
      setOption({ ...option, selectedEntry: null });
    } else {
      setOption({ ...option, selectedEntry: JSON.stringify(entry) });
    }
    // console.log(event.nativeEvent);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsive(300),
            marginLeft: responsive(10),
          }}
        >
          <Text style={{ ...TextStyles.normalSemiBold }}>Line</Text>
          <Text style={{ ...TextStyles.normalBold }}>1M</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>15M</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>8H</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>1D</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>1W</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>More</Text>
          <Text style={{ ...TextStyles.normalSemiBold }}>Depth</Text>
        </View>
        <View style={styles.views}>
          {data?.length > 100 ? (
            <CandleStickChart
              borderColor={processColor(colors.WHITELIGHT)}
              pinchZoom={true}
              drawGridBackground={true}
              animation={{ durationX: 3000 }}
              gridBackgroundColor={processColor('transparent')}
              style={styles.chart}
              data={option?.data}
              marker={option?.marker}
              chartDescription={{ text: '' }}
              legend={option?.legend}
              xAxis={option?.xAxis}
              yAxis={option?.yAxis}
              onSelect={handleSelect}
              maxVisibleValueCount={0}
              // onChange={(event: { nativeEvent: any }) =>
              //   console.log('123',)
              // }
            />
          ) : (
            <View style={styles.viewLoading} pointerEvents="box-none">
              <Spinner type="Wave" size={60} color={colors.GREEN} />
            </View>
          )}
          <View style={styles.viewText}>
            <Image
              source={ICONS.iconExTobe}
              style={styles.imageExTobe}
              blurRadius={10}
              resizeMode="contain"
            />
            <Image
              source={ICONS.textExTobe}
              style={styles.imageText}
              resizeMode="contain"
            />
          </View>
        </View>
        <InforBuySell />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: responsive(20),
  },
  chart: {
    flex: 1,
  },
  views: {
    height: responsive(350),
  },
  viewText: {
    marginTop: responsive(160),
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    alignContent: 'center',
    left: '30%',
    opacity: 0.3,
  },
  viewLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageExTobe: {
    width: responsive(20),
    height: responsive(20),
    right: responsive(5),
  },
  imageText: {
    width: responsive(125),
    height: responsive(15),
  },
});
