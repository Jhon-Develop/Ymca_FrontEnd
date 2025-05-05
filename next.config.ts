import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  reactStrictMode: true,
};

export default nextConfig;
