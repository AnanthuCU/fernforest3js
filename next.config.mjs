/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  turbopack: {},
  // Ensures Three.js and GSAP are only bundled for the browser
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent Three.js from being included in the server bundle
      config.externals = [
        ...(config.externals || []),
        "three",
      ];
    }
    return config;
  },
};

export default nextConfig;
