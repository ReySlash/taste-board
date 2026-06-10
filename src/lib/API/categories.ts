import { MealCategory } from "@/types/meals";

export async function getCategories(): Promise<string[]> {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const categories = data.categories.map(
    (category: MealCategory) => category.strCategory,
  );
  return categories;
}
