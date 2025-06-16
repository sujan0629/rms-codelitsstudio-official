export {}; // to make this a module

declare global {
  interface GlobalThis {
    Netlify: {
      env: {
        get(key: string): string | undefined;
      };
    };
  }
}
