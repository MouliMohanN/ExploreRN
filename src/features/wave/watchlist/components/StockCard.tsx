import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface StockCardProps {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  volume: string;
  volumeChange: number;
  logo?: string;
  newsCount?: number;
  attachmentCount?: number;
}

export const StockCard: React.FC<StockCardProps> = ({
  name,
  exchange,
  price,
  priceChange,
  priceChangePercent,
  volume,
  volumeChange,
  newsCount = 0,
  attachmentCount = 0,
}) => {
  // Ensure all numeric values are valid
  const safePrice = price ?? 0;
  const safePriceChange = priceChange ?? 0;
  const safePriceChangePercent = priceChangePercent ?? 0;
  const safeVolumeChange = volumeChange ?? 0;
  const safeVolume = volume ?? '0k';

  const isPositive = safePriceChange >= 0;
  const backgroundColor = isPositive ? '#e8f5e9' : '#ffebee';
  const textColor = isPositive ? '#2e7d32' : '#c62828';

  return (
    <View style={styles.container}>
      {/* Left Section - Logo and Stock Info */}
      <View style={styles.leftSection}>
        <View style={styles.logoContainer}>
          <Icon name='bank' size={32} color='#ff6b35' />
        </View>
        <View style={styles.stockInfo}>
          <Text style={styles.stockName}>{name}</Text>
          <View style={styles.exchangeRow}>
            <Text style={styles.exchangeText}>{exchange}</Text>
            {newsCount > 0 && (
              <View style={styles.iconBadge}>
                <Icon name='newspaper-variant-outline' size={14} color='#666' />
                <Text style={styles.badgeText}>{newsCount}</Text>
              </View>
            )}
            {attachmentCount > 0 && (
              <View style={styles.iconBadge}>
                <Icon name='file-document-outline' size={14} color='#666' />
                <Text style={styles.badgeText}>{attachmentCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Right Section - Price and priceChange */}
      <View style={styles.rightSection}>
        <Text style={styles.priceText}>{safePrice.toFixed(2)}</Text>
        <View style={[styles.changeContainer, { backgroundColor }]}>
          <Text style={[styles.changeText, { color: textColor }]}>
            {isPositive ? '+' : ''}
            {safePriceChange.toFixed(2)} ({isPositive ? '+' : ''}
            {safePriceChangePercent.toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.volumeRow}>
          <Text style={styles.volumeLabel}>Vol: </Text>
          <Text style={styles.volumeText}>{safeVolume}</Text>
          <Text style={[styles.volumeChange, { color: safeVolumeChange >= 0 ? '#2e7d32' : '#c62828' }]}>
            {' '}
            ({safeVolumeChange >= 0 ? '+' : ''}
            {safeVolumeChange.toFixed(2)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff5f3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  exchangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exchangeText: {
    fontSize: 12,
    color: '#757575',
  },
  iconBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  badgeText: {
    fontSize: 11,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 6,
  },
  changeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeLabel: {
    fontSize: 11,
    color: '#757575',
  },
  volumeText: {
    fontSize: 11,
    color: '#212121',
  },
  volumeChange: {
    fontSize: 11,
    fontWeight: '500',
  },
});
