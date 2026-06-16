import { CocktailCategoryResponse } from "@/types/cocktails";
import { MealCategoriesResponse } from "@/types/meals";
import { fetchJson } from "./fetch-json";

const CATEGORIES_REVALIDATE_SECONDS = 86400;

export async function getCategories(
  productType: "meals" | "cocktails",
): Promise<string[]> {
  let URL: string;
  if (productType === "meals") {
    URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const data = await fetchJson<MealCategoriesResponse>(URL, {
      revalidate: CATEGORIES_REVALIDATE_SECONDS,
    });

    return data.categories.map((category) => category.strCategory);
  }

  URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const data = await fetchJson<CocktailCategoryResponse>(URL, {
    revalidate: CATEGORIES_REVALIDATE_SECONDS,
  });

  return data.drinks.map((category) => category.strCategory);
}
