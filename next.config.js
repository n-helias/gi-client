/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const strapiDomain = process.env.NEXT_PUBLIC_STRAPI_DOMAIN?.trim();
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.trim();
const publicUrl = process.env.NEXT_PUBLIC_URL?.trim();

const nextConfig = {
  output: "standalone",
  experimental: {
    instrumentationHook: true,
    webpackBuildWorker: true,
  },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_URL: publicUrl,
    NEXT_PUBLIC_STRAPI_API_URL: strapiApiUrl,
    NEXT_PUBLIC_STRAPI_DOMAIN: strapiDomain,
    HAWK_TOKEN: process.env.HAWK_TOKEN,
  },
  images: {
    remotePatterns: strapiDomain
      ? [
          {
            protocol: "https",
            hostname: strapiDomain,
          },
        ]
      : [],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  async rewrites() {
    if (!strapiApiUrl) return [];

    return [
      {
        source: "/uploads/:path*",
        destination: `${strapiApiUrl}/uploads/:path*`,
      },
    ];
  },
};

const sentryConfig = withSentryConfig(
  nextConfig,
  {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true,
  },
  {
    widenClientFileUpload: false,
    transpileClientSDK: false,
    tunnelRoute: "/api/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);

module.exports = sentryConfig;
