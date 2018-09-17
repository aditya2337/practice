// src/app/next.config.js

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/campaigns/new': { page: '/campaigns/new' },
      '/campaigns/:address': { page: '/campaigns/show' },
      '/campaigns/:address/requests': { page: '/campaigns/requests/index' },
      '/campaigns/:address/requests/new': { page: '/campaigns/requests/new' }
    };
  },
  distDir: '../functions/next'
};
