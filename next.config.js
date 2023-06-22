/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
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
