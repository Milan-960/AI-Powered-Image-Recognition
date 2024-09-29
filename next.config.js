/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public", // Service worker files will be generated in 'public'
  register: true, // Automatically registers the service worker
  skipWaiting: true, // Immediately activate new service workers
  runtimeCaching, // Enables runtime caching for offline functionality
  buildExcludes: [/middleware-manifest.json$/], // Exclude middleware manifest from caching
  disable: process.env.NODE_ENV === "development", // Disable PWA in development
});

const nextConfig = withPWA({
  reactStrictMode: true, // Enables React's strict mode
  swcMinify: true, // Uses SWC for faster builds and smaller bundles
});

module.exports = nextConfig;
