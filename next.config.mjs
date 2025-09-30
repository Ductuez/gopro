import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pandascore.co",
      },
    ],
  },

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
