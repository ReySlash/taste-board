import { getMeals } from "@/lib/API/get-meals";
import CardsGrid from "./cards-grid";
import { setMealsFilters } from "@/lib/set-meals-filters";

type Props = {
  category?: string;
  queryName?: string;
};

async function MealsResults(props: Props) {
  const { category, queryName } = props;
  const filters = setMealsFilters(category, queryName);
  const meals = await getMeals(filters);

  return <CardsGrid mealsData={meals || []} />;
}

export default MealsResults;
