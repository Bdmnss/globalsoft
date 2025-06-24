import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false, // Set to true if this is a permanent redirect
      },
    ]
  },
}

export default nextConfig
