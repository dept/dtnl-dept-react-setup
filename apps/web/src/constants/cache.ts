export const isDevelopment = process.env.NODE_ENV === 'development';

export const TEN_SECONDS = 10;
export const THIRTHY_SECONDS = 3 * TEN_SECONDS;
export const ONE_MINUTE = 6 * TEN_SECONDS;
export const TWO_MINUTES = 2 * ONE_MINUTE;
export const FIVE_MINUTES = 5 * ONE_MINUTE;
export const THIRTHY_MINUTES = 30 * ONE_MINUTE;
export const HOUR = 60 * ONE_MINUTE;
export const DAY = HOUR * 24;

export const REVALIDATE_PAGE_TTL = isDevelopment ? false : THIRTHY_MINUTES;
