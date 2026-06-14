"use client";

import { useEffect, useState } from "react";
import CardsGrid from "@/components/cards-grid";
import {
  FavoriteItem,
  FAVORITES_UPDATED_EVENT,
  readFavorites,
  toCocktailSummaries,
  toMealSummaries,
} from "@/lib/favorites";

function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    function syncFavorites() {
      setFavorites(readFavorites());
    }

    syncFavorites();
    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorites);
    };
  }, []);

  return (
    <main className="mx-auto min-h-0 flex-1 w-full overflow-y-auto">
      <CardsGrid
        mealsData={toMealSummaries(favorites)}
        cocktailsData={toCocktailSummaries(favorites)}
      />
    </main>
  );
}

export default FavoritesPage;
