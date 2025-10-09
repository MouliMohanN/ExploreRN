import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { Button as RNButton, ButtonProps as RNPButtonProps } from 'react-native-paper';

type Props = Omit<RNPButtonProps, 'children' | 'mode'> & {
  title?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle> | undefined;
  children?: React.ReactNode;
  mode?: RNPButtonProps['mode'];
};

export const Button = ({ title, children, contentStyle, mode = 'contained', style, ...rest }: Props) => {
  // flatten incoming style to inspect if marginTop/marginVertical already provided
  const flattened = StyleSheet.flatten(style) as ViewStyle | undefined;
  const hasMarginTop = !!(flattened && (flattened.marginTop !== undefined || flattened.marginVertical !== undefined));

  const finalStyle = hasMarginTop ? style : StyleSheet.flatten([{ marginTop: 16 }, style]);

  return (
    <RNButton {...(rest as any)} mode={mode} style={finalStyle} contentStyle={contentStyle as any}>
      {children ? children : <Text>{title}</Text>}
    </RNButton>
  );
};

export default Button;
