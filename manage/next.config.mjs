import { HOST_NAME } from './src/config/qiniu-config.mjs';
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img2.imgtp.com',
        port: '',
        pathname: '/2024/01/25/G95hu3Ph.jpg',
      },
      {
        protocol: 'http',
        hostname: HOST_NAME,
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [{
      source: '/api/:path*',
      // destination:'https://mock.apifox.cn/m1/2398938-0-default/api/:path*'
      destination: "http://localhost:3005/api/:path*"
    },
    {
      source: '/qiniu',
      // destination:'https://mock.apifox.cn/m1/2398938-0-default/api/:path*'
      destination: "http://upload-z2.qiniup.com"
    },
    ]
  },

  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, tls: false, 
      // dgram: false, readline:false, module:false, async_hooks:false, net:false 
    };

    return config;
  },

};

export default nextConfig;
