import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pandascore.co',
      },
      {
        protocol: 'https',
        hostname: 'dpm.lol',
      },
      {
        protocol: 'https',
        hostname: 'dmp.lol',
      },
      {
        protocol: 'https',
        hostname: 'liquipedia.net',
      },
      {
        protocol: 'https',
        hostname: 'am-a.akamaihd.net',
      },
      {
        protocol: 'https',
        hostname: 'static.lolesports.com',
      },
      {
        protocol: 'http',
        hostname: 'static.lolesports.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dpm.lol',
      },
      {
        protocol: 'https',
        hostname: 'assets.dpm.lol',
      },
      {
        protocol: 'https',
        hostname: 'images.dpm.lol',
      },
      {
        protocol: 'https',
        hostname: 'dpm.lol',
        pathname: '/esport/players/**',
      },
      {
        protocol: 'https', 
        hostname: 'dpm.lol',
        pathname: '/esport/teams/**',
      },
    ],
  },
  
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
