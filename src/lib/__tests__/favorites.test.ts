import { describe, expect, it, vi } from "vitest";
import {
  FAVORITES_KEY,
  FAVORITES_UPDATED_EVENT,
  isFavorite,
  readFavorites,
  toCocktailSummaries,
  toMealSummaries,
  writeFavorites,
  type FavoriteItem,
} from "@/lib/favorites";

const favorites: FavoriteItem[] = [
  {
    id: "meal-1",
    productType: "meals",
    title: "Meal One",
    description: "Cuban",
    image: "/meal.jpg",
  },
  {
    id: "drink-1",
    productType: "cocktails",
    title: "Drink One",
    description: "Ignored",
    image: "/drink.jpg",
  },
];

describe("favorites helpers", () => {
  it("returns an empty array when no favorites exist", () => {
    expect(readFavorites()).toEqual([]);
  });

  it("returns an empty array when stored favorites are malformed", () => {
    window.localStorage.setItem(FAVORITES_KEY, "{bad json");

    expect(readFavorites()).toEqual([]);
  });

  it("writes serialized favorites to localStorage", () => {
    writeFavorites(favorites);

    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe(
      JSON.stringify(favorites),
    );
  });

  it("dispatches the favorites updated event when writing", () => {
    const listener = vi.fn();
    window.addEventListener(FAVORITES_UPDATED_EVENT, listener);

    writeFavorites(favorites);

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(FAVORITES_UPDATED_EVENT, listener);
  });

  it("matches favorites by both id and product type", () => {
    expect(
      isFavorite(favorites, { id: "meal-1", productType: "meals" }),
    ).toBe(true);
    expect(
      isFavorite(favorites, { id: "meal-1", productType: "cocktails" }),
    ).toBe(false);
  });

  it("maps only meal favorites to meal summaries", () => {
    expect(toMealSummaries(favorites)).toEqual([
      {
        idMeal: "meal-1",
        strMeal: "Meal One",
        strMealThumb: "/meal.jpg",
        strArea: "Cuban",
        strCountry: "Cuban",
      },
    ]);
  });

  it("maps only cocktail favorites to cocktail summaries", () => {
    expect(toCocktailSummaries(favorites)).toEqual([
      {
        idDrink: "drink-1",
        strDrink: "Drink One",
        strDrinkThumb: "/drink.jpg",
      },
    ]);
  });
});
