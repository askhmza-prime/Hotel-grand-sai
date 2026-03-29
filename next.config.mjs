/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Allow images from external hostnames ──
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      // Add your actual hotel photo CDN / storage hostname here later:
      // { protocol: "https", hostname: "your-supabase-project.supabase.co" },
    ],
  },

  // ── Strict mode for catching issues early ──
  reactStrictMode: true,

  // ── Compress responses ──
  compress: true,

  // ── Custom response headers for security + perf ──
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Redirects (add canonical redirects later if needed) ──
  async redirects() {
    return [
      // Example: redirect old page to new
      // { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
