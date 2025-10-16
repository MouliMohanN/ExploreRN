// modules/user/user.events.ts
import '@AppEvents';

declare module '@AppEvents' {
  interface AppEvents {
    'carouselTabs.focusInfo': { screenName: string; currentIndex: number; offscreenPageLimit?: number };
  }
}
