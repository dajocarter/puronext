/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'wordpress.puroflux.com'
      }
    ]
  }
}

module.exports = nextConfig
