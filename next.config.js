/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    NEXT_WEB3_API_KEY: process.env.WEB3_API_KEY,
    NEXT_WEB3_URL: process.env.WEB3_API_URL,
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/transactions",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
