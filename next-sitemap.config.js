/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000',
  generateRobotsTxt: true,
  canonicalBase: 'http://localhost:3000',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
