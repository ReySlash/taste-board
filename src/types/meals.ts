export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type MealCategoriesResponse = {
  categories: MealCategory[];
};

export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCountry: string;
};

export type MealsFilterResponse = {
  meals: MealSummary[];
};

export type MealDetails = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strCountry: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;

  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export type MealDetailsResponse = {
  meals: MealDetails[];
};
