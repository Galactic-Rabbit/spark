import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'], // <-- используем тот же загрузчик
        as: '*.js', // <-- обрабатываем как JavaScript-модуль
      },
    },
  },
}

export default nextConfig
