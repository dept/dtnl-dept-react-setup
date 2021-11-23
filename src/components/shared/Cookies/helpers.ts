import Router from 'next/router';
import { Cookies } from 'react-cookie';

import { CookiesConfig } from './CookiesConfig';

function getCookieExpiry() {
  const date = new Date();
  return new Date(date.setDate(date.getDate() + 365));
}

function acceptCookies() {
  const cookies = new Cookies();
  const expires = getCookieExpiry();

  cookies.set(`${CookiesConfig.prefix}accepted`, true, { expires, sameSite: 'lax' });

  CookiesConfig.cookies?.map(cookie => {
    cookies.set(CookiesConfig.prefix + cookie.name, true, { expires, sameSite: 'lax' });
  });
}

function dismissCookies() {
  const cookies = new Cookies();
  const expires = getCookieExpiry();

  cookies.set(`${CookiesConfig.prefix}accepted`, false, { expires, sameSite: 'lax' });

  CookiesConfig.cookies?.map(cookie => {
    cookies.set(CookiesConfig.prefix + cookie.name, cookie.value, { expires, sameSite: 'lax' });
  });

  Router.push('/cookies');
}

export { acceptCookies, dismissCookies };
