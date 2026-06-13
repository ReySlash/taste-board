import { MealSummary } from "@/types/meals";
import { RecipeCard } from "./recipe-card";

type Props = {
  data: MealSummary[];
};

function CardsGrid(props: Props) {
  const { data } = props;
  return data.length === 0 ? (
    <div className="flex flex-col h-full justify-center items-center">
      <p className="text-3xl">No recipes found.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
      {data.map((item) => (
        <div key={item.idMeal} className="col-span-1">
          <RecipeCard
            id={item.idMeal}
            title={item.strMeal}
            description={item.strArea}
            image={item.strMealThumb}
          />
        </div>
      ))}
    </div>
  );
}

export default CardsGrid;
