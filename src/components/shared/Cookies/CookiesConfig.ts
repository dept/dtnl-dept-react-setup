/*
https://gdpr.eu/cookies/

Marketing cookies: These cookies track your online activity to help advertisers deliver more
relevant advertising or to limit how many times you see an ad. These cookies can share that
information with other organizations or advertisers. These are persistent cookies and almost always
of third-party provenance.

Necessary cookies: These cookies are essential for you to browse the website and use its
features, such as accessing secure areas of the site. Cookies that allow web shops to hold your
items in your cart while you are shopping online are an example of strictly necessary cookies. These
cookies will generally be first-party session cookies. While it is not required to obtain consent
for these cookies, what they do and why they are necessary should be explained to the user.

Preferences cookies: Also known as "functionality cookies", these cookies allow a website to
remember choices you have made in the past, like what language you prefer, what region you would
like weather reports for, or what your user name and password are so you can automatically log in.

Statistics cookies: Also known as "performance cookies", these cookies collect information about how
you use a website, like which pages you visited and which links you clicked on. None of this
information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole
purpose is to improve website functions. This includes cookies from third-party analytics services
as long as the cookies are for the exclusive use of the owner of the website visited.
*/

export const CookiesConfig = {
  prefix: '',
  cookies: [
    {
      name: 'marketing',
      value: false,
    },
    {
      name: 'necessary',
      value: true,
    },
    {
      name: 'preferences',
      value: false,
    },
    {
      name: 'statistics',
      value: false,
    },
  ],
};
