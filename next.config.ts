import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,

  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "**",
      },
      
      {
        protocol: "https",
        hostname: "renderplay.mx",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "renderplay.mx",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost", // Add localhost if needed
        port: "3000",
        pathname: "**", // Adjust pathname as needed
      },
    ],
  },
};
export default nextConfig;
