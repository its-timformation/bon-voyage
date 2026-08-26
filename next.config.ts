import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is static (every dynamic route already has
  // generateStaticParams, there are no API routes or middleware, and
  // favourites/newsletter forms are client-only), so it exports cleanly as
  // plain HTML/CSS/JS — the simplest, fully-free deploy target on Cloudflare
  // (Workers static assets / Pages), no server runtime required.
  output: "export",
};

export default nextConfig;
