/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  swcMinify: false, // Disable SWC minification (Next.js >=12)
  
};

module.exports = nextConfig;
