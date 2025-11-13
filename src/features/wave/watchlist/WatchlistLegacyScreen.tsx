import { default as React } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ScreenConfig } from '../../../common/navigation/conventions';
import { ScreenBaseProps } from '../../../common/types/ScreenBaseProps';
import { StockCard, StockCardProps } from './components/StockCard';
import { mockStocks } from './utils/mockStocks';

export default function WatchlistLegacyScreen({}: ScreenBaseProps): React.ReactElement {
  const renderStockCard = ({ item }: { item: StockCardProps }) => <StockCard {...item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={mockStocks}
        renderItem={renderStockCard}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'WatchlistLegacy',
  component: WatchlistLegacyScreen,
  options: {
    headerShown: true,
    title: 'WatchlistLegacy Screen',
  },
};
