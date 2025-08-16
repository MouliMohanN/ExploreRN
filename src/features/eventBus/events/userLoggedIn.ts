// modules/user/user.events.ts
import "@AppEvents";

declare module "@AppEvents" {
  interface AppEvents {
    "user.loggedIn": { id: number; name: string };
    "user.loggedOut": void;
  }
}
