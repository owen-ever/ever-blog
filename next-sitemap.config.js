const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://blog.owen.kr';
const postsDir = process.env.POSTS_DIR || path.join(process.cwd(), 'api/posts');

function getPostEntries() {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const filePath = path.join(postsDir, file);
      const lastmod = fs.statSync(filePath).mtime.toISOString();

      return {
        slug,
        lastmod,
      };
    });
}

function getPostsIndexEntry() {
  return {
    loc: '/posts',
    changefreq: 'daily',
    priority: 0.8,
  };
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  canonicalBase: SITE_URL,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  additionalPaths: async () => [
    getPostsIndexEntry(),
    ...getPostEntries().map(({ slug, lastmod }) => ({
      loc: `/posts/${slug}`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.7,
    })),
  ],
};
