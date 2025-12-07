import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CustomCheckbox } from './CustomCheckbox';

export type ScriptCardWithCheckBoxProps = {
  icon?: string;
  title: string;
  titleSubText?: string;
  subText: string;
  isChecked: boolean;
  onPress?: () => void;
};

export const ScriptCardWithCheckBox: React.FC<ScriptCardWithCheckBoxProps> = (props: ScriptCardWithCheckBoxProps) => {
  const renderCheckBox = () => {
    return <CustomCheckbox isChecked={props.isChecked} size={20} />;
  };
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {({ pressed }) => (
        <>
          {pressed && <View style={styles.pressedOverlay} />}
          <View style={styles.contentContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.logoPlaceholder}>
                <Text style={{ color: '#D81B60', fontWeight: 'bold' }}>{props.title.substring(0, 3)}</Text>
              </View>

              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{props.title}</Text>
                  {props.titleSubText ?
                    <Text style={styles.titleSubText}>{props.titleSubText}</Text>
                  : null}
                </View>
                <Text style={styles.subText}>{props.subText}</Text>
              </View>
            </View>

            <View style={styles.checkboxContainer}>{renderCheckBox()}</View>
          </View>
          <View style={styles.separator} />
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    position: 'relative', // Context for absolute overlay
    overflow: 'hidden', // Optional, keeps overlay within bounds
  },
  pressedOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.1)', // Darkens the background
    zIndex: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  logoPlaceholder: {
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginRight: 6,
  },
  titleSubText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#757575',
    textTransform: 'uppercase',
  },
  subText: {
    fontSize: 12,
    color: '#757575',
  },
  checkboxContainer: {
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
  },
});
