// modules/user/user.events.ts
import '@AppEvents';

declare module '@AppEvents' {
  interface AppEvents {
    'watchlist.stockCard': {
      name: string;
      price: number;
      priceChange: number;
      priceChangePercent: number;
      volume: string;
      volumeChange: number;
    };
  }
}
