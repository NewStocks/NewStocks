/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.ap-northeast-2.amazonaws.com', 'file.alphasquare.co.kr']
  },
  experimental: {
    appDir: true,
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/005930?tab=company",
  //       permanent: false,
  //     },
  //   ];
  // },
}

module.exports = nextConfig
