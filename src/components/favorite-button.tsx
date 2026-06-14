"use client";

import { useEffect, useState } from "react";
import {
  FavoriteItem,
  FAVORITES_UPDATED_EVENT,
  isFavorite,
  readFavorites,
  writeFavorites,
} from "@/lib/favorites";
import { IoIosHeart } from "react-icons/io";
import { Button } from "./ui/button";

const FavoriteButton = ({ item }: { item: FavoriteItem }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteKey = {
      id: item.id,
      productType: item.productType,
    };

    function syncFavoriteState() {
      setFavorite(isFavorite(readFavorites(), favoriteKey));
    }

    syncFavoriteState();
    window.addEventListener("storage", syncFavoriteState);
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavoriteState);

    return () => {
      window.removeEventListener("storage", syncFavoriteState);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavoriteState);
    };
  }, [item.id, item.productType]);

  function toggleFavorite() {
    const favorites = readFavorites();
    const nextFavorites = isFavorite(favorites, item)
      ? favorites.filter(
          (savedFavorite) =>
            !(
              savedFavorite.id === item.id &&
              savedFavorite.productType === item.productType
            ),
        )
      : [...favorites, item];

    const nextFavoriteState = isFavorite(nextFavorites, item);
    writeFavorites(nextFavorites);
    setFavorite(nextFavoriteState);
  }

  return (
    <Button
      onClick={toggleFavorite}
      size="icon"
      variant="outline"
      className="absolute top-2 right-2 z-20"
      aria-pressed={favorite}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <IoIosHeart className={favorite ? "text-red-500" : "text-foreground"} />
    </Button>
  );
};

export default FavoriteButton;
