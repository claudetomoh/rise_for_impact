/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Rewrites for auth pages to maintain /admin/login URLs
    async rewrites() {
        return [{
                source: '/admin/login',
                destination: '/login',
            },
            {
                source: '/admin/forgot-password',
                destination: '/forgot-password',
            },
            {
                source: '/admin/reset-password',
                destination: '/reset-password',
            },
        ]
    },
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    devIndicators: {
        buildActivity: false,
        buildActivityPosition: 'bottom-right',
    },
    // Performance optimizations
    poweredByHeader: false,
    compress: true,
    // Turbopack configuration for Next.js 16+
    turbopack: {},
}

module.exports = nextConfig