import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a parent lockfile exists one
  // level up, which Next would otherwise infer as the root).
  turbopack: {
    root: path.join(__dirname),
  },
  // Let phones/other devices on the LAN load dev resources (HMR + JS chunks)
  // when testing via the Network URL. Dev-only; ignored in production builds.
  // If your phone's IP changes, update this to match the Network URL Next prints.
  allowedDevOrigins: ["172.20.10.2"],
  images: {
    // Allow the optimizer to serve our own first-party SVG logo.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // The scored self-tests moved from standalone campaign pages to the Chestionare
  // tab (client's v2 pivot). Any ad/social link already pointing at /test/* keeps
  // working.
  async redirects() {
    return [
      { source: "/test/:slug", destination: "/chestionare/:slug", permanent: true },
      { source: "/test", destination: "/chestionare", permanent: true },
    ];
  },
};

export default nextConfig;
