import { useContext } from 'react';
import { ActiveTabContext } from './ActiveTabContext';
import { CounterContext } from './CounterContext';

export const useTabScreenData = (tabIndex: number) => {
  const { count } = useContext(CounterContext);
  const activeTabContext = useContext(ActiveTabContext);

  const isFocused = activeTabContext?.currentIndex === tabIndex;
  const shouldRender = Math.abs(activeTabContext!.currentIndex - tabIndex) <= activeTabContext!.offscreenPageLimit;

  return {
    count,
    isFocused,
    shouldRender,
    activeTabContext, // Expose the full context for other uses if needed
  };
};
