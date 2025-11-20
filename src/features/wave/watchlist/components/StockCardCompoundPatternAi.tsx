import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { logger } from '../../../../common/utils/logger/logger';

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

// Create context for sharing stock data
interface StockCardContextValue {
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
  isPositive: boolean;
  backgroundColor: string;
  textColor: string;
}

const StockCardContext = createContext<StockCardContextValue | null>(null);

export const useStockCardContext = () => {
  const context = useContext(StockCardContext);
  if (!context) {
    throw new Error('StockCard compound components must be used within StockCard');
  }
  return context;
};

// Main compound component
interface StockCardCompoundProps {
  children: React.ReactNode;
  data: StockCardProps;
  style?: ViewStyle;
}

const StockCardRoot: React.FC<StockCardCompoundProps> = React.memo(({ children, data, style }) => {
  const safePrice = data.price ?? 0;
  const safePriceChange = data.priceChange ?? 0;
  const safePriceChangePercent = data.priceChangePercent ?? 0;
  const safeVolumeChange = data.volumeChange ?? 0;
  const safeVolume = data.volume ?? '0k';

  const isPositive = safePriceChange >= 0;
  const backgroundColor = isPositive ? '#e8f5e9' : '#ffebee';
  const textColor = isPositive ? '#2e7d32' : '#c62828';

  const contextValue: StockCardContextValue = {
    symbol: data.symbol,
    name: data.name,
    exchange: data.exchange,
    price: safePrice,
    priceChange: safePriceChange,
    priceChangePercent: safePriceChangePercent,
    volume: safeVolume,
    volumeChange: safeVolumeChange,
    logo: data.logo,
    newsCount: data.newsCount ?? 0,
    attachmentCount: data.attachmentCount ?? 0,
    isPositive,
    backgroundColor,
    textColor,
  };

  return (
    <StockCardContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </StockCardContext.Provider>
  );
});
StockCardRoot.displayName = 'StockCardRoot';

// Left Section Component
interface LeftSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const LeftSection: React.FC<LeftSectionProps> = React.memo(({ children, style }) => {
  return <View style={[styles.leftSection, style]}>{children}</View>;
});
LeftSection.displayName = 'LeftSection';

// Logo Component
export interface LogoProps {
  iconName?: string;
  iconColor?: string;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = React.memo(({ iconName = 'bank', iconColor = '#ff6b35', style }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <Icon name={iconName} size={32} color={iconColor} />
    </View>
  );
});
Logo.displayName = 'Logo';

// Stock Info Component
interface StockInfoProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const StockInfo: React.FC<StockInfoProps> = React.memo(({ children, style }) => {
  return <View style={[styles.stockInfo, style]}>{children}</View>;
});
StockInfo.displayName = 'StockInfo';

// Stock Name Component
interface StockNameProps {
  style?: TextStyle;
}

const StockName: React.FC<StockNameProps> = React.memo(({ style }) => {
  const { name } = useStockCardContext();
  logger.info('StockName', name);
  return <Text style={[styles.stockName, style]}>{name}</Text>;
});
StockName.displayName = 'StockName';

// Exchange Row Component
interface ExchangeRowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ExchangeRow: React.FC<ExchangeRowProps> = React.memo(({ children, style }) => {
  return <View style={[styles.exchangeRow, style]}>{children}</View>;
});
ExchangeRow.displayName = 'ExchangeRow';

// Exchange Text Component
interface ExchangeTextProps {
  style?: TextStyle;
}

const ExchangeText: React.FC<ExchangeTextProps> = React.memo(({ style }) => {
  const { exchange } = useStockCardContext();
  return <Text style={[styles.exchangeText, style]}>{exchange}</Text>;
});
ExchangeText.displayName = 'ExchangeText';

// Badge Component
interface BadgeProps {
  type: 'news' | 'attachment';
  style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = React.memo(({ type, style }) => {
  const { newsCount, attachmentCount } = useStockCardContext();
  const count = type === 'news' ? newsCount : attachmentCount;
  const iconName = type === 'news' ? 'newspaper-variant-outline' : 'file-document-outline';

  if (count === 0) return null;

  return (
    <View style={[styles.iconBadge, style]}>
      <Icon name={iconName} size={14} color='#666' />
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
});
Badge.displayName = 'Badge';

// Right Section Component
interface RightSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const RightSection: React.FC<RightSectionProps> = React.memo(({ children, style }) => {
  return <View style={[styles.rightSection, style]}>{children}</View>;
});
RightSection.displayName = 'RightSection';

// Price Component
interface PriceProps {
  style?: TextStyle;
}

const Price: React.FC<PriceProps> = React.memo(({ style }) => {
  const { price } = useStockCardContext();
  return <Text style={[styles.priceText, style]}>{price.toFixed(2)}</Text>;
});
Price.displayName = 'Price';

// Price Change Component
interface PriceChangeProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PriceChange: React.FC<PriceChangeProps> = React.memo(({ style, textStyle }) => {
  const { priceChange, priceChangePercent, isPositive, backgroundColor, textColor } = useStockCardContext();

  return (
    <View style={[styles.changeContainer, { backgroundColor }, style]}>
      <Text style={[styles.changeText, { color: textColor }, textStyle]}>
        {isPositive ? '+' : ''}
        {priceChange.toFixed(2)} ({isPositive ? '+' : ''}
        {priceChangePercent.toFixed(2)}%)
      </Text>
    </View>
  );
});
PriceChange.displayName = 'PriceChange';

// Volume Component
interface VolumeProps {
  style?: ViewStyle;
}

const Volume: React.FC<VolumeProps> = React.memo(({ style }) => {
  const { volume, volumeChange } = useStockCardContext();

  return (
    <View style={[styles.volumeRow, style]}>
      <Text style={styles.volumeLabel}>Vol: </Text>
      <Text style={styles.volumeText}>{volume}</Text>
      <Text style={[styles.volumeChange, { color: volumeChange >= 0 ? '#2e7d32' : '#c62828' }]}>
        {' '}
        ({volumeChange >= 0 ? '+' : ''}
        {volumeChange.toFixed(2)}%)
      </Text>
    </View>
  );
});
Volume.displayName = 'Volume';

// Compose compound component
export const StockCardCompoundAi = Object.assign(StockCardRoot, {
  LeftSection,
  Logo,
  StockInfo,
  StockName,
  ExchangeRow,
  ExchangeText,
  Badge,
  RightSection,
  Price,
  PriceChange,
  Volume,
});

// Default implementation matching StockCardLegacy
export const StockCardCompoundPatternAi = React.memo<StockCardProps>((props) => {
  return (
    <StockCardCompoundAi data={props}>
      <StockCardCompoundAi.LeftSection>
        <StockCardCompoundAi.Logo />
        <StockCardCompoundAi.StockInfo>
          <StockCardCompoundAi.StockName />
          <StockCardCompoundAi.ExchangeRow>
            <StockCardCompoundAi.ExchangeText />
            <StockCardCompoundAi.Badge type='news' />
            <StockCardCompoundAi.Badge type='attachment' />
          </StockCardCompoundAi.ExchangeRow>
        </StockCardCompoundAi.StockInfo>
      </StockCardCompoundAi.LeftSection>

      <StockCardCompoundAi.RightSection>
        <StockCardCompoundAi.Price />
        <StockCardCompoundAi.PriceChange />
        <StockCardCompoundAi.Volume />
      </StockCardCompoundAi.RightSection>
    </StockCardCompoundAi>
  );
});
StockCardCompoundPatternAi.displayName = 'StockCardCompoundPattern';

export const styles = StyleSheet.create({
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
