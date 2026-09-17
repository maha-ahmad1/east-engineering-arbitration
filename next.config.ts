import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile in the parent directory
  // otherwise makes Turbopack look outside this project.
  turbopack: { root: __dirname },

  images: {
    // Next 16 requires every non-default quality to be allowlisted.
    qualities: [75, 85, 90],
    // Object form, with `search` left unconstrained: Unsplash serves its
    // transforms via query strings, which the URL shorthand would block.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
