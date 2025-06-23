import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
