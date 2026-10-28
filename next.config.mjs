/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  distDir: process.env.NODE_ENV === 'development' && /^\.next\/[a-z0-9-]+$/.test(process.env.PORTFOLIO_DEV_DIST ?? '') ? process.env.PORTFOLIO_DEV_DIST : '.next',
  async redirects() {
    return [
      { source: '/editor', destination: '/about', permanent: true },
      { source: '/projects', destination: '/about#selected-work', permanent: true },
    ]
  },
  async headers() {
    const security = [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), accelerometer=(), gyroscope=()' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
    ] }]
    return process.env.NODE_ENV === 'production'
      ? [...security, ...['/travel/manage', '/about/manage', '/api/admin/:path*'].map((source) => ({
          source,
          headers: [
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
          ],
        }))]
      : security
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
