import { useContext, useEffect, useState } from 'react';
import { CounterContext } from '../../../features/tabView/CounterContext';
import { AppEventBus } from '../../utils/eventBus/EventBus';

export const useCarouselTabFocus = (screenName: string, tabIndex: number) => {
  const { count } = useContext(CounterContext);
  // const activeTabContext = useContext(ActiveTabContext);
  const [isFocused, setIsFocused] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const unsubscribe = AppEventBus.subscribe('carouselTabs.focusInfo', (payload) => {
      const { screenName: screenNameFromEvent, currentIndex, offscreenPageLimit = 1 } = payload;
      if (screenNameFromEvent == screenName) {
        setIsFocused(currentIndex === tabIndex);
        if (Math.abs(currentIndex - tabIndex) <= offscreenPageLimit) {
          setShouldRender(true);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [screenName, tabIndex]);

  // const isFocused = activeTabContext?.currentIndex === tabIndex;
  // const shouldRender = Math.abs(activeTabContext!.currentIndex - tabIndex) <= activeTabContext!.offscreenPageLimit;

  return {
    count,
    isFocused,
    shouldRender,
    // activeTabContext, // Expose the full context for other uses if needed
  };
};
