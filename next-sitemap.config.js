/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blog.owen.kr',
  generateRobotsTxt: true,
  canonicalBase: 'https://blog.owen.kr',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
