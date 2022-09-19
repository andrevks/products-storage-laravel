/** @type {import('next').NextConfig} */

const nextConfig = {
  // nextConfig: {
  //   reactStrictMode: true,
  //   swcMinify: true,
  // },
  reactStrictMode: true,
  swcMinify: true,

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
}

module.exports = nextConfig




