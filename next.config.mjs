/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: '/editor', destination: '/about', permanent: true }]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
