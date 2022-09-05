/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['wordpress.puroflux.com']
  }
}

module.exports = nextConfig
