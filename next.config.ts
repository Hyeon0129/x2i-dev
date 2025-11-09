// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'x2i.dev', pathname: '/wp-content/**' },
    ],
  },
}

export default nextConfig
