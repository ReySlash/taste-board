import { MealSummary } from "@/types/meals";
import { CocktailSummary } from "@/types/cocktails";
import { RecipeCard } from "./recipe-card";

type Props = {
  mealsData?: MealSummary[];
  cocktailsData?: CocktailSummary[];
};

function CardsGrid(props: Props) {
  const { mealsData, cocktailsData } = props;
  const meals = mealsData ?? [];
  const cocktails = cocktailsData ?? [];
  const isEmpty = meals.length === 0 && cocktails.length === 0;

  return isEmpty ? (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <p className="text-3xl">No recipes found.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
      {meals?.map((item) => (
        <div key={item.idMeal} className="col-span-1">
          <RecipeCard
            productType="meals"
            id={item.idMeal}
            title={item.strMeal}
            description={item.strArea}
            image={item.strMealThumb}
          />
        </div>
      ))}
      {cocktails?.map((item) => (
        <div key={item.idDrink} className="col-span-1">
          <RecipeCard
            productType="cocktails"
            id={item.idDrink}
            title={item.strDrink}
            description={""}
            image={item.strDrinkThumb}
          />
        </div>
      ))}
    </div>
  );
}

export default CardsGrid;
