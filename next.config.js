/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  reactStrictMode: false,
  images: {
    unoptimized: process.env.NEXT_PUBLIC_MODE == "web" ? false : true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        hostname: "localhost",
      },
    ],
    loaderFile: "utils/next-image-config.ts",
  },
};

module.exports = nextConfig;
