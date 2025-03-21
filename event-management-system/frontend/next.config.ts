/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*', // Proxy to Backend
            },
        ]
    },
}

module.exports = nextConfig