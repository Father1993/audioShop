/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'magnitola-admin.netlify.app' },
      { protocol: 'https', hostname: 'magitola.netlify.app' },
    ],
  },
}

module.exports = nextConfig
