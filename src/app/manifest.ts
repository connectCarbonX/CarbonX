import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CARBON-X",
    short_name: "CARBON-X",
    description:
      "Track your carbon footprint, complete eco-friendly actions, and earn rewards with CARBON-X.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#16a34a",
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
