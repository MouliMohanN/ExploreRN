import React from 'react';
import { Text } from 'react-native';
import { Button as RNButton } from 'react-native-paper';
import { logger } from '../utils/logger/logger';

logger.info('Button imports executed');

export const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  logger.info('Button rendered');
  return (
    <RNButton mode='contained' style={{ marginTop: 16 }} onPress={onPress}>
      <Text>{title}</Text>
    </RNButton>
  );
};
