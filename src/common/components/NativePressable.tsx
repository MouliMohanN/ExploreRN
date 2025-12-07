import React from 'react';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface NativePressableProps extends PressableProps {
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}

export const NativePressable: React.FC<NativePressableProps> = ({ children, style, ...props }) => {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
      style={({ pressed }) => {
        const userStyle = typeof style === 'function' ? style({ pressed }) : style;
        const opacityStyle = Platform.OS === 'ios' && pressed ? { opacity: 0.7 } : {};

        return [userStyle, opacityStyle];
      }}
    >
      {children}
    </Pressable>
  );
};
