const path = require('path')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = withSass(
  withOffline({
    webpack: config => {
      config.resolve.alias['pages'] = path.join(__dirname, 'src/pages')
      config.resolve.alias['components'] = path.join(
        __dirname,
        'src/components'
      )
      config.resolve.alias['utils'] = path.join(__dirname, 'src/utils')
      config.resolve.alias['prisma'] = path.join(
        __dirname,
        'prisma/generated/prisma-client'
      )
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
