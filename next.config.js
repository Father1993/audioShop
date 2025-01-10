/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'magitola.netlify.app' },
      // { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

module.exports = nextConfig
