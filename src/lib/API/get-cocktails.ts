import { cache } from "react";
import { CocktailDetailsResponse, CocktailSummary } from "@/types/cocktails";

function buildURL(filters: string[]): string {
  if (filters[0] === "filter") {
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filters[1]}`;
  }
  return `https://www.thecocktaildb.com/api/json/v1/1/search.php?${filters[1]}`;
}

export async function getCocktails(
  filters: string[],
): Promise<CocktailSummary[]> {
  const URL = buildURL(filters);
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data.drinks) ? data.drinks : [];
}

export const getCocktailById = cache(
  async (id: string): Promise<CocktailDetailsResponse> => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
  },
);
