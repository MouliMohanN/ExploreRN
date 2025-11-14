import { FlashList } from '@shopify/flash-list';
import { default as React, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenConfig } from '../../../common/navigation/conventions';
import { ScreenBaseProps } from '../../../common/types/ScreenBaseProps';
import { AppEventBus } from '../../../common/utils/eventBus/EventBus';
import { logger } from '../../../common/utils/logger/logger';
import { StockCardProps } from './components/StockCardCompoundPatternAi';
import { StockCardCompoundPatternWithEventBus } from './components/StockCardCompoundPatternWithEventBus';
import { mockStocks } from './utils/mockStocks';

const getRandomPriceChange = (basePrice: number, volatility: number = 0.02): number => {
  const safePrice = Math.max(0, basePrice || 0);
  const changePercent = (Math.random() - 0.5) * volatility * 2;
  return safePrice * changePercent;
};

// Helper function to format volume
const formatVolume = (volume: number): string => {
  const safeVolume = Math.max(0, volume || 0);
  if (safeVolume >= 1000000) {
    return `${(safeVolume / 1000000).toFixed(2)}M`;
  } else if (safeVolume >= 1000) {
    return `${(safeVolume / 1000).toFixed(2)}k`;
  }
  return safeVolume.toFixed(2);
};

export default function WatchlistCompoundPatternWithEventBusScreen({
  navigation,
}: ScreenBaseProps): React.ReactElement {
  const [stocks, setStocks] = useState<StockCardProps[]>(mockStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      stocks.map((stock) => {
        // Ensure stock has valid values
        const currentPrice = stock.price ?? 100;
        const currentVolume = stock.volume ?? '0k';

        // Generate random price change (±2% of current price)
        const priceChange = getRandomPriceChange(currentPrice, 0.02);
        const newPrice = currentPrice + priceChange;

        // Calculate new price change from original base price
        const originalStock = mockStocks.find((s) => s.symbol === stock.symbol);
        const originalPrice = originalStock?.price ?? currentPrice;
        const totalPriceChange = newPrice - originalPrice;
        const priceChangePercent = originalPrice !== 0 ? (totalPriceChange / originalPrice) * 100 : 0;

        // Generate random volume change (±5%)
        const volumeChangePercent = (Math.random() - 0.5) * 10; // -5% to +5%

        // Parse current volume and apply change with validation
        const volumeStr = currentVolume.replace(/[kM]/g, '');
        const volumeNum = parseFloat(volumeStr) || 0;
        const multiplier =
          currentVolume.includes('M') ? 1000000
          : currentVolume.includes('k') ? 1000
          : 1;
        const currentVolumeNum = volumeNum * multiplier;
        const newVolumeNum = Math.max(0, currentVolumeNum * (1 + volumeChangePercent / 100));

        AppEventBus.publish('watchlist.stockCard', {
          name: stock.symbol,
          price: newPrice,
          priceChange: totalPriceChange,
          priceChangePercent: priceChangePercent,
          volume: formatVolume(newVolumeNum),
          volumeChange: volumeChangePercent,
        });

        logger.info(
          `Stock: ${stock.symbol}, Price: ${newPrice}, Volume: ${formatVolume(newVolumeNum)}, Price percent: ${priceChangePercent.toFixed(2)}`,
        );
      });
    }, 500);

    return () => clearInterval(interval);
  }, [stocks]);

  const renderStockCard = ({ item }: { item: StockCardProps }) => <StockCardCompoundPatternWithEventBus {...item} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={stocks}
        renderItem={renderStockCard}
        keyExtractor={(item) => item.symbol}
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
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'WatchlistCompoundPatternWithEventBus',
  component: WatchlistCompoundPatternWithEventBusScreen,
  options: {
    headerShown: true,
    title: 'WatchlistCompoundPatternWithEventBus Screen',
  },
};
