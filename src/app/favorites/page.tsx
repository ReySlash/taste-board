import type { Metadata } from "next";
import FavoritesPage from "@/components/favorites-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Your Favorite Recipes",
  description:
    "Browse the meals and cocktails you saved on this device in your personal Taste Board favorites list.",
  pathname: "/favorites",
  robots: {
    index: false,
    follow: false,
  },
});

export default function FavoritesRoute() {
  return <FavoritesPage />;
}
