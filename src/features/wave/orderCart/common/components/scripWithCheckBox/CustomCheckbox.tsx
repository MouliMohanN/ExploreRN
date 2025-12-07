import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CustomCheckboxProps {
  isChecked: boolean;
  indeterminate?: boolean;
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked,
  indeterminate,
  size = 24,
  checkedColor = '#212121',
  uncheckedColor = '#757575',
}) => {
  const isFilled = isChecked || indeterminate;
  const scale = size / 24;

  // Calculate dynamic dimensions base on 24px reference
  const strokeWidth = Math.max(1.5, 2.5 * scale); // Slightly thicker checkmark
  const borderRadius = size / 6;
  const borderWidth = Math.max(1.5, 2 * scale);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: isFilled ? checkedColor : uncheckedColor,
          backgroundColor: isFilled ? checkedColor : 'transparent',
        },
      ]}
    >
      {indeterminate ?
        <View style={{ width: size * 0.6, height: strokeWidth, backgroundColor: '#FFF' }} />
      : isChecked && (
          <View
            style={{
              width: 13 * scale,
              height: 7 * scale,
              borderBottomWidth: strokeWidth,
              borderLeftWidth: strokeWidth,
              borderColor: '#FFF',
              transform: [{ rotate: '-45deg' }, { translateY: -1 * scale }, { translateX: 0 }],
            }}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Removed unused styles
});
