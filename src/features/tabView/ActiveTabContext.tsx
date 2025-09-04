import React from 'react';

export type ActiveTabContextValue = {
  currentIndex: number;
  offscreenPageLimit: number;
  totalTabs: number;
};

export const ActiveTabContext = React.createContext<ActiveTabContextValue | null>(null);
