import { MealCategory } from "@/types/meals";

export async function getCategories(
  productType: "meals" | "cocktails",
): Promise<string[]> {
  let URL: string;
  let categoriesKey: string;
  if (productType === "meals") {
    URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
    categoriesKey = "categories";
  } else {
    URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    categoriesKey = "drinks";
  }
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const categories = data[categoriesKey].map(
    (category: MealCategory) => category.strCategory,
  );
  return categories;
}
