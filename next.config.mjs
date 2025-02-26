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
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  //output: "export",
  distDir: ".next",
};

export default nextConfig;