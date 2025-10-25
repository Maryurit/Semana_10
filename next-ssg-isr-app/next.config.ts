// next.config.ts
import type { NextConfig } from "next";

// 👇 Ignorar certificados SSL solo en desarrollo
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // Para Pokémon
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',// Para Rick and Morty
      },
    ],
  },
};

export default nextConfig;
