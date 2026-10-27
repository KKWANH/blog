/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: '/editor', destination: '/about', permanent: true }]
  },
  async headers() {
    return process.env.NODE_ENV === 'production'
      ? [{
          source: '/travel/manage',
          headers: [
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          ],
        }]
      : []
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
