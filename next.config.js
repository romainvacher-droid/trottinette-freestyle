/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Avatars Google OAuth
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      // Avatars GitHub OAuth
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    // NEXTAUTH_URL n'a pas besoin d'être exposé côté client
  },
  transpilePackages: ['next-auth'],
};

module.exports = nextConfig;
