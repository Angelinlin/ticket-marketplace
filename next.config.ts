import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // This should accept all the local hostnames and the remote hostnames
    // This should also accept all the protocols https://brave-coyote-725.convex.cloud/api/storage/6699e468-ace5-42a6-af4b-2a65c46af33e
    remotePatterns: [
      { hostname: "upbeat-stoat-959.convex.cloud", protocol: "https" },
      { hostname: "wary-anaconda-29.convex.cloud", protocol: "https" },
      { hostname: "brave-coyote-725.convex.cloud", protocol: "https" }, // Agrega esta línea
      { hostname: "industrious-deer-919.convex.cloud", protocol: "https"}
    ],
  },
};

export default nextConfig;
