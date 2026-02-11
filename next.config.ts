import path from "node:path";
import { fileURLToPath } from "node:url";
import million from "million/compiler";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/npm/simple-icons@latest/icons/**',
      },
    ],
  },
};

const millionConfig = {
  auto: { rsc: true },
  rsc: true,
};

const millionNextConfig = million.next(
  {
    appDir: true,
  },
  millionConfig,
);

const { appDir: _ignoredAppDir, ...millionRuntimeConfig } = millionNextConfig;

export default {
  ...nextConfig,
  ...millionRuntimeConfig,
};
