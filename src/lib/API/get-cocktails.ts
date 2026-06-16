import { CocktailDetailsResponse, CocktailSummary } from "@/types/cocktails";
import { fetchJson } from "./fetch-json";

const LISTINGS_REVALIDATE_SECONDS = 1800;
const DETAILS_REVALIDATE_SECONDS = 21600;

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
  const data = await fetchJson<CocktailDetailsResponse>(URL, {
    revalidate: LISTINGS_REVALIDATE_SECONDS,
  });
  return Array.isArray(data.drinks) ? data.drinks : [];
}

export async function getCocktailById(
  id: string,
): Promise<CocktailDetailsResponse> {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetchJson<CocktailDetailsResponse>(URL, {
    revalidate: DETAILS_REVALIDATE_SECONDS,
  });
}
