/** @type {import('next').NextConfig} */

module.exports = {
  nextConfig: {
    reactStrictMode: true,
    swcMinify: true,
  },

  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
  },
}




