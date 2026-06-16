import { MealDetailsResponse, MealSummary } from "@/types/meals";
import { fetchJson } from "./fetch-json";

const LISTINGS_REVALIDATE_SECONDS = 1800;
const DETAILS_REVALIDATE_SECONDS = 21600;

function buildURL(filters: string[]): string {
  if (filters[0] === "filter") {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?${filters[1]}`;
  }
  return `https://www.themealdb.com/api/json/v1/1/search.php?${filters[1]}`;
}

export async function getMeals(filters: string[]): Promise<MealSummary[]> {
  const URL = buildURL(filters);
  const data = await fetchJson<MealDetailsResponse>(URL, {
    revalidate: LISTINGS_REVALIDATE_SECONDS,
  });
  return Array.isArray(data.meals) ? data.meals : [];
}

export async function getMealById(id: string): Promise<MealDetailsResponse> {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  return fetchJson<MealDetailsResponse>(URL, {
    revalidate: DETAILS_REVALIDATE_SECONDS,
  });
}
