import type { NextConfig } from "next";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const remoteAppUrl =
  process.env.NEXT_PUBLIC_REMOTE_APP_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.output.publicPath = "auto";

    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "hostApp",
          filename: "static/runtime/remoteEntry.js",
          remotes: {
            remoteApp: `remoteApp@${remoteAppUrl}/_next/static/chunks/remoteEntry.js`,
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            "react-dom": {
              singleton: true,
              requiredVersion: false,
            },
            "react-redux": {
              singleton: true,
            },
            "@reduxjs/toolkit": {
              singleton: true,
            },
          },
          extraOptions: {},
        })
      );
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        "remoteApp/Button": false,
        "remoteApp/HeaderContainer": false,
        "remoteApp/Menu": false,
        "remoteApp/HomeApp": false,
        "remoteApp/TransactionApp": false,
      };
    }

    return config;
  },
};

export default nextConfig;