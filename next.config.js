/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY
  },
  transpilePackages: ['next-auth']
};

module.exports = nextConfig;
