/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply the header to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://localhost https://sandbox-buy.paddle.com",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;