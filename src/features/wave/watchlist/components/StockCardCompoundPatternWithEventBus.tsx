import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppEventBus } from '../../../../common/utils/eventBus/EventBus';

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

type StockCardContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

type StockCardComponent = React.FC<StockCardContainerProps> & {
  Row: React.FC<RowProps>;
  Column: React.FC<ColumnProps>;
  Logo: React.FC<LogoProps>;
  StockName: React.FC<StockNameProps>;
  Tags: React.FC<TagsProps>;
  Price: React.ForwardRefExoticComponent<PriceProps & React.RefAttributes<PriceHandle>>;
  Badge: React.FC<BadgeProps>;
  PriceChange: React.ForwardRefExoticComponent<PriceChangeProps & React.RefAttributes<PriceChangeHandle>>;
  Volume: React.ForwardRefExoticComponent<VolumeProps & React.RefAttributes<VolumeHandle>>;
};

const StockCard = (({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
}) as StockCardComponent;

type RowProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};
const Row: React.FC<RowProps> = ({ style, children }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};
StockCard.Row = Row;

type ColumnProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};
const Column: React.FC<ColumnProps> = ({ style, children }) => {
  return <View style={[styles.column, style]}>{children}</View>;
};
StockCard.Column = Column;

type LogoProps = {
  iconName?: string;
  iconColor?: string;
  style?: ViewStyle;
};

const Logo: React.FC<LogoProps> = ({ iconName = 'bank', iconColor = '#ff6b35', style }) => {
  return (
    <View style={[styles.logoContainer, style]}>
      <Icon name={iconName} size={32} color={iconColor} />
    </View>
  );
};
StockCard.Logo = Logo;

type StockNameProps = {
  name: string;
};
const StockName: React.FC<StockNameProps> = (props: StockNameProps) => {
  const [name, setName] = useState<string>(props.name);
  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  return <Text style={styles.stockName}>{name}</Text>;
};
StockCard.StockName = StockName;

type TagProp = {
  name: string;
};

type TagsProps = {
  tags: TagProp[];
};

const Tags: React.FC<TagsProps> = (props: TagsProps) => {
  const [tags, setTags] = useState<TagProp[]>(props.tags);
  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);
  return (
    <>
      {tags.map((tag) => (
        <Text key={tag.name} style={styles.tagText}>
          {tag.name}
        </Text>
      ))}
    </>
  );
};
StockCard.Tags = Tags;

type PriceProps = {
  price: string;
};

export interface PriceHandle {
  updatePrice: (price: string) => void;
}

const Price = forwardRef<PriceHandle, PriceProps>((props, ref) => {
  const [price, setPrice] = useState<string>(props.price);

  useImperativeHandle(ref, () => ({
    updatePrice: (newPrice: string) => {
      setPrice(newPrice);
    },
  }));

  return <Text style={styles.priceText}>{price}</Text>;
});
Price.displayName = 'Price';
StockCard.Price = Price;

interface BadgeProps {
  type: 'news' | 'attachment';
  style?: ViewStyle;
  newsCount?: number;
  attachmentCount?: number;
}

const Badge: React.FC<BadgeProps> = ({ type, style, newsCount = 0, attachmentCount = 0 }) => {
  const count = type === 'news' ? newsCount : attachmentCount;
  const iconName = type === 'news' ? 'newspaper-variant-outline' : 'file-document-outline';

  if (count === 0) return null;

  return (
    <View style={[styles.iconBadge, style]}>
      <Icon name={iconName} size={14} color='#666' />
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};
StockCard.Badge = Badge;

type PriceChangeProps = {
  priceChangeText: string;
  isPositive: boolean;
};

export interface PriceChangeHandle {
  updatePriceChange: (priceChangeText: string, isPositive: boolean) => void;
}

const PriceChange = forwardRef<PriceChangeHandle, PriceChangeProps>((props, ref) => {
  const [priceChangeText, setPriceChangeText] = useState<string>(props.priceChangeText);
  const [isPositive, setIsPositive] = useState<boolean>(props.isPositive);

  useImperativeHandle(ref, () => ({
    updatePriceChange: (newPriceChangeText: string, newIsPositive: boolean) => {
      setPriceChangeText(newPriceChangeText);
      setIsPositive(newIsPositive);
    },
  }));

  const backgroundColor = isPositive ? '#e8f5e9' : '#ffebee';
  const textColor = isPositive ? '#2e7d32' : '#c62828';

  return (
    <View style={[styles.changeContainer, { backgroundColor }]}>
      <Text style={[styles.changeText, { color: textColor }]}>{priceChangeText}</Text>
    </View>
  );
});
PriceChange.displayName = 'PriceChange';
StockCard.PriceChange = PriceChange;

interface VolumeProps {
  style?: ViewStyle;
  volume: string;
  volumeChange: number;
}

export interface VolumeHandle {
  updateVolume: (volume: string, volumeChange: number) => void;
}

const Volume = forwardRef<VolumeHandle, VolumeProps>(({ style, volume, volumeChange }, ref) => {
  const [volumeText, setVolumeText] = useState<string>(volume);
  const [volumeChangeValue, setVolumeChangeValue] = useState<number>(volumeChange);

  useImperativeHandle(ref, () => ({
    updateVolume: (newVolume: string, newVolumeChange: number) => {
      setVolumeText(newVolume);
      setVolumeChangeValue(newVolumeChange);
    },
  }));

  return (
    <View style={[styles.volumeRow, style]}>
      <Text style={styles.volumeLabel}>Vol: </Text>
      <Text style={styles.volumeText}>{volumeText}</Text>
      <Text style={[styles.volumeChange, { color: volumeChangeValue >= 0 ? '#2e7d32' : '#c62828' }]}>
        {' '}
        ({volumeChangeValue >= 0 ? '+' : ''}
        {volumeChangeValue.toFixed(2)}%)
      </Text>
    </View>
  );
});
Volume.displayName = 'Volume';
StockCard.Volume = Volume;

export const StockCardCompoundPatternWithEventBus: React.FC<StockCardProps> = (props: StockCardProps) => {
  const { name, exchange, price, priceChange, priceChangePercent, volume, volumeChange, newsCount, attachmentCount } =
    props;

  // Safe defaults for undefined values
  const safePrice = price ?? 0;
  const safePriceChange = priceChange ?? 0;
  const safePriceChangePercent = priceChangePercent ?? 0;
  const safeVolume = volume ?? '0k';
  const safeVolumeChange = volumeChange ?? 0;

  // Create refs for imperative handles
  const priceRef = useRef<PriceHandle>(null);
  const priceChangeRef = useRef<PriceChangeHandle>(null);
  const volumeRef = useRef<VolumeHandle>(null);

  const tags = useMemo(() => [{ name: exchange ?? 'N/A' }], [exchange]);
  const isPositive = safePriceChange >= 0;

  useEffect(() => {
    const unsubscribe = AppEventBus.subscribe('watchlist.stockCard', (payload) => {
      if (payload.name === name) {
        // Update price using exposed method
        if (priceRef.current && payload.price !== undefined) {
          priceRef.current.updatePrice(payload.price.toFixed(2));
        }

        // Update price change using exposed method
        if (priceChangeRef.current && payload.priceChange !== undefined && payload.priceChangePercent !== undefined) {
          const isPricePositive = payload.priceChange >= 0;
          const priceChangeText = `${isPricePositive ? '+' : ''}${payload.priceChange.toFixed(2)} (${isPricePositive ? '+' : ''}${payload.priceChangePercent.toFixed(2)}%)`;
          priceChangeRef.current.updatePriceChange(priceChangeText, isPricePositive);
        }

        // Update volume using exposed method
        if (volumeRef.current && payload.volume !== undefined && payload.volumeChange !== undefined) {
          volumeRef.current.updateVolume(payload.volume, payload.volumeChange);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [name]);

  return (
    <StockCard>
      <StockCard.Row style={{ flex: 1 }}>
        <StockCard.Logo />
        <StockCard.Column style={{ flex: 1 }}>
          <StockCard.StockName name={name ?? 'Unknown'} />
          <StockCard.Row style={{ alignItems: 'center', gap: 8 }}>
            <StockCard.Tags tags={tags} />
            <StockCard.Badge type='news' newsCount={newsCount} />
            <StockCard.Badge type='attachment' attachmentCount={attachmentCount} />
          </StockCard.Row>
        </StockCard.Column>
        <StockCard.Column style={{ alignItems: 'flex-end' }}>
          <StockCard.Price ref={priceRef} price={safePrice.toFixed(2)} />
          <StockCard.PriceChange
            ref={priceChangeRef}
            priceChangeText={`${isPositive ? '+' : ''}${safePriceChange.toFixed(2)} (${isPositive ? '+' : ''}${safePriceChangePercent.toFixed(2)}%)`}
            isPositive={isPositive}
          />
          <StockCard.Volume ref={volumeRef} volume={safeVolume} volumeChange={safeVolumeChange} />
        </StockCard.Column>
      </StockCard.Row>
    </StockCard>
  );
};

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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  tagText: {
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
