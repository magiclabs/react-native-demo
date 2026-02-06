import React from 'react';
import { Text as RNText, TextProps as RNTextProps, useColorScheme, View as RNView, ViewProps as RNViewProps } from 'react-native';

import Colors from '../constants/Colors';

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = RNViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Text({ style, lightColor, darkColor, ...rest }: TextProps) {
  const colorScheme = useColorScheme();
  const color = colorScheme === 'dark' ? (darkColor ?? Colors.dark.text) : (lightColor ?? Colors.light.text);
  return <RNText style={[{ color }, style]} {...rest} />;
}

export function View({ style, lightColor, darkColor, ...rest }: ViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? (darkColor ?? Colors.dark.background) : (lightColor ?? Colors.light.background);
  return <RNView style={[{ backgroundColor }, style]} {...rest} />;
}
