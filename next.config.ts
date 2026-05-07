import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // All pages are statically rendered at build time (SSG).
  // Forms remain interactive client-side via Supabase.
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    // Local images only — no remote patterns currently needed.
    // Producer logos / external images can be added here later.
  },

  // SEO: Trailing-slash off (canonical URLs without slash)
  trailingSlash: false,

  // 301-Redirects for legacy WordPress URLs.
  // Extend this list once the old URLs / GSC report are reviewed.
  async redirects() {
    return [
      { source: "/sonntagsbestellung-brot", destination: "/bestelle/zmorge", permanent: true },
      { source: "/burgerathome", destination: "/bestelle/burger", permanent: true },
      { source: "/burger-home", destination: "/bestelle/burger", permanent: true },
      { source: "/hotstoneathome", destination: "/bestelle/hotstone", permanent: true },
      { source: "/hotstone-home", destination: "/bestelle/hotstone", permanent: true },
      { source: "/tischgrill-fondue-chinoise", destination: "/bestelle/saisonal", permanent: true },
      { source: "/shop", destination: "/bestelle", permanent: true },
      { source: "/produzenten", destination: "/produzente", permanent: true },
      { source: "/standorte", destination: "/laede", permanent: true },
      { source: "/standorte/sarmenstorf", destination: "/laede/sarmenstorf", permanent: true },
      { source: "/standorte/bettwil", destination: "/laede/bettwil", permanent: true },
    ];
  },

  // Long-term cache headers for hashed assets, short cache for HTML
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
