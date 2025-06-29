import React from 'react';

import { ViewStyle } from 'react-native';

import * as SvgSource from '@assets/svg';

type SvgType = typeof SvgSource;
export type NameSVG = keyof SvgType;
interface Props {
  name: NameSVG;
  width: number;
  height: number;
  color?: string;
  style?: ViewStyle;
}
export const SvgComponent = ({ name, ...rest }: Props) => {
  const SVG = SvgSource[name];
  return <SVG {...rest} />;
};
