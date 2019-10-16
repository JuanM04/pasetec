const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')

const isDev = process.env.NODE_ENV !== 'production'
const path = dir => require('path').resolve(__dirname, dir)

module.exports = withSass(
  withOffline({
    webpack: config => {
      // Aliases that let you do "import component from 'components'" instead of "import component from '../components'"
      config.resolve.alias = {
        ...config.resolve.alias,
        pages: path('src/pages'),
        components: path('src/components/index.ts'),
        utils: path('src/utils'),
        prisma: path('prisma/generated/prisma-client/index.ts'),
      }

      config.resolve.extensions.push('.ts', '.tsx')
      return config
    },

    target: 'serverless',

    env: isDev ? require('dotenv').config() : {},

    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  })
)
