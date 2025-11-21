import React from 'react';
import { Pressable, Text, View } from 'react-native';

type ScreenHeaderProps = {
  title: string;
  onBackPress: () => void;
  rightComponent?: React.ReactNode;
};

export const ScreenHeader: React.FC<ScreenHeaderProps> = (props: ScreenHeaderProps) => {
  return (
    <View>
      <Pressable onPress={props.onBackPress}>
        <Text>Back</Text>
      </Pressable>
      <Text>{props.title}</Text>
      {props.rightComponent}
    </View>
  );
};
