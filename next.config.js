/** @type {import('next').NextConfig} */

const withFonts = require('next-fonts')

const nextConfig = {
  experimental: {
    largePageDataBytes: 248 * 1024,
    // optimizePackageImports: ['@mui/icons-material', '@mui/material', 'lodash'],
  },

  output: 'standalone',
  enableSvg: true,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      }
    )
    fileLoaderRule.exclude = /\.svg$/i
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.npmjs.com/**',
      },
      {
        protocol: 'https',
        hostname: 'files.gitbook.com/**',
      },
      {
        protocol: 'https',
        hostname: 'api-ipfs.attoaioz.cyou/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway-ipfs.attoaioz.cyou/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway.w3ipfs.storage/**',
      },
    ],
  },
  // experimental: {
  //   modularizeImports: {
  //     lodash: {
  //       transform: 'lodash/{{member}}',
  //     },
  //     '@mui/material': {
  //       transform: '@mui/material/{{member}}',
  //     },
  //     '@mui/lab': {
  //       transform: '@mui/lab/{{member}}',
  //     },
  //     '@mui/icons-material/?(((\\w*)?/?)*)': {
  //       transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
  //     },
  //   },
  // },
}

module.exports = nextConfig
