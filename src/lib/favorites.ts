import { CocktailSummary } from "@/types/cocktails";
import { MealSummary } from "@/types/meals";

export const FAVORITES_KEY = "tasteboard:favorites";
export const FAVORITES_UPDATED_EVENT = "tasteboard:favorites-updated";

export type FavoriteItem = {
  id: string;
  productType: "meals" | "cocktails";
  title: string;
  description: string;
  image: string;
};

export function readFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawFavorites = window.localStorage.getItem(FAVORITES_KEY);
  if (!rawFavorites) {
    return [];
  }

  try {
    const parsedFavorites: unknown = JSON.parse(rawFavorites);
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: FavoriteItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
}

export function isFavorite(
  favorites: FavoriteItem[],
  item: Pick<FavoriteItem, "id" | "productType">,
) {
  return favorites.some(
    (favorite) =>
      favorite.id === item.id && favorite.productType === item.productType,
  );
}

export function toMealSummaries(favorites: FavoriteItem[]): MealSummary[] {
  return favorites
    .filter((favorite) => favorite.productType === "meals")
    .map((favorite) => ({
      idMeal: favorite.id,
      strMeal: favorite.title,
      strMealThumb: favorite.image,
      strArea: favorite.description,
      strCountry: favorite.description,
    }));
}

export function toCocktailSummaries(
  favorites: FavoriteItem[],
): CocktailSummary[] {
  return favorites
    .filter((favorite) => favorite.productType === "cocktails")
    .map((favorite) => ({
      idDrink: favorite.id,
      strDrink: favorite.title,
      strDrinkThumb: favorite.image,
    }));
}
