import { MealDetailsResponse, MealSummary } from "@/types/meals";

function buildURL(filters: string[]): string {
  if (filters[0] === "filter") {
    return `https://www.themealdb.com/api/json/v1/1/filter.php?${filters[1]}`;
  }
  return `https://www.themealdb.com/api/json/v1/1/search.php?${filters[1]}`;
}

export async function getMeals(filters: string[]): Promise<MealSummary[]> {
  const URL = buildURL(filters);
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

export async function getMealById(id: string): Promise<MealDetailsResponse> {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
