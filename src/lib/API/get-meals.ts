import { MealSummary } from "@/types/meals";

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
  console.log(URL);
  return data.meals;
}
