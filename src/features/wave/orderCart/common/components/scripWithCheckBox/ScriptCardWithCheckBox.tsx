import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export type ScriptCardWithCheckBoxProps = {
  icon: string;
  title: string;
  titleSubText: string;
  subText: string;
  isChecked: boolean;
};

export const ScriptCardWithCheckBox: React.FC<ScriptCardWithCheckBoxProps> = (props: ScriptCardWithCheckBoxProps) => {
  const renderIcon = () => {
    return <View></View>;
  };

  const renderCheckBox = () => {
    return <View></View>;
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>
      {renderIcon()}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 12 }}>{props.title}</Text>
            <Text style={{ fontSize: 10 }}>{props.titleSubText}</Text>
          </View>
          <Text>{props.subText}</Text>
        </View>
        {renderCheckBox()}
      </View>
    </View>
  );
};
