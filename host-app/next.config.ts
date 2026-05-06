import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.output.publicPath = 'auto';

    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'hostApp',
          filename: 'static/runtime/remoteEntry.js',
          remotes: {
            remoteApp: `remoteApp@${process.env.NEXT_PUBLIC_REMOTE_APP_URL}/_next/static/chunks/remoteEntry.js`
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false
            },
            "react-redux": { singleton: true },
           '@reduxjs/toolkit': { singleton: true },
          },
          extraOptions: {},
        })
      );
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'remoteApp/Button': false,
        'remoteApp/HeaderContainer': false,
        'remoteApp/Menu': false,
        'remoteApp/HomeApp': false,
        'remoteApp/TransactionApp': false,
      };
    }
    return config;
  },
};

export default nextConfig;
