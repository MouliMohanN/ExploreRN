import React, { useState } from 'react';

export const CounterContext = React.createContext<{ count: number; setCount: (count: number) => void; }>({ count: 0, setCount: () => {} });

export const useCounter = () => {
  const [count, setCount] = useState(0);
  return { count, setCount };
};
