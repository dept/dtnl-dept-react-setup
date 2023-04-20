/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/unsupported'],
};

module.exports = { ...config };
