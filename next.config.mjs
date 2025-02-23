/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'hohxdqffasgcrflfyrxs.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hohxdqffasgcrflfyrxs.supabase.co',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  output: "export",
  distDir: ".next",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;