export const isBrowser = typeof window !== 'undefined';

export const browser = <T = any>(value: () => T): T => (isBrowser ? value() : undefined) as T;
