import { describe, expect, it } from "vitest";
import { setMealsFilters } from "@/lib/set-meals-filters";
import { setCocktailsFilters } from "@/lib/set-cocktail-filters";

describe("setMealsFilters", () => {
  it("defaults to beef category when no filters are provided", () => {
    expect(setMealsFilters()).toEqual(["filter", "c=beef"]);
  });

  it("prefers queryName over category", () => {
    expect(setMealsFilters("Seafood", "chicken")).toEqual([
      "search",
      "s=chicken",
    ]);
  });

  it("returns the category filter when only category is provided", () => {
    expect(setMealsFilters("Seafood")).toEqual(["filter", "c=Seafood"]);
  });
});

describe("setCocktailsFilters", () => {
  it("defaults to Beer category when no filters are provided", () => {
    expect(setCocktailsFilters()).toEqual(["filter", "c=Beer"]);
  });

  it("prefers queryName over category", () => {
    expect(setCocktailsFilters("Ordinary Drink", "margarita")).toEqual([
      "search",
      "s=margarita",
    ]);
  });

  it("returns the category filter when only category is provided", () => {
    expect(setCocktailsFilters("Ordinary Drink")).toEqual([
      "filter",
      "c=Ordinary Drink",
    ]);
  });
});
