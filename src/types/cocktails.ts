export type CocktailCategoryResponse = {
  drinks: CocktailCategory[];
};

export type CocktailCategory = {
  strCategory: string;
};

export type CocktailSummary = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
};

export type CocktailDetailsResponse = {
  drinks: CocktailDetails[];
};

export type CocktailDetails = {
  idDrink: string;
  strDrink: string;
  strVideo: string;
  strIBA: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};
