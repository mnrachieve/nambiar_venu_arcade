import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
const config = (phase: string): NextConfig => ({
  // Avoid the inaccessible legacy .next/trace cache on this Windows workspace.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-cache' : '.next',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
});
export default config;
