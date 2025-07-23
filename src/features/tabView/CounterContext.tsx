import React from 'react';

export const CounterContext = React.createContext<{ count: number; setCount: (count: number) => void; }>({ count: 0, setCount: () => {} });
