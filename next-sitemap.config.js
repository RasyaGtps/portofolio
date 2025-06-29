// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://www.rasyarayhandev.my.id', // Ganti ini dengan URL aslimu
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/api/*'],
  }
  