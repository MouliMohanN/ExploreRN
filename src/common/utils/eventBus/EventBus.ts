import { AppEvents } from "./events";

// eventBus.ts
type Listener<T> = (value: T) => void;

interface ChannelData<T> {
  lastValue?: T;
  listeners: Set<Listener<T>>;
}

function createEventBus<EventMap extends Record<string, any>>() {
  const channels: {
    [K in keyof EventMap]?: ChannelData<EventMap[K]>;
  } = {};

  function subscribe<K extends keyof EventMap>(
    eventName: K,
    listener: Listener<EventMap[K]>
  ): () => void {
    if (!channels[eventName]) {
      channels[eventName] = { listeners: new Set() };
    }

    channels[eventName]!.listeners.add(listener);

    // Deliver last value immediately if available
    if ("lastValue" in channels[eventName]!) {
      listener(channels[eventName]!.lastValue as EventMap[K]);
    }

    return () => unsubscribe(eventName, listener);
  }

  function unsubscribe<K extends keyof EventMap>(
    eventName: K,
    listener: Listener<EventMap[K]>
  ): void {
    channels[eventName]?.listeners.delete(listener);
  }

  function publish<K extends keyof EventMap>(
    eventName: K,
    value: EventMap[K]
  ): void {
    if (!channels[eventName]) {
      channels[eventName] = { listeners: new Set(), lastValue: value };
      return;
    }

    channels[eventName]!.lastValue = value;
    // Copy to avoid issues if listener unsubscribes during iteration
    [...channels[eventName]!.listeners].forEach((fn) => fn(value));
  }

  return Object.freeze({ subscribe, unsubscribe, publish });
}


export const AppEventBus = createEventBus<AppEvents>();
