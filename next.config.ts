import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH (e.g. "/lean-portfolio"); it's empty locally and on a username.github.io repo.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
