import { getMeals } from "@/lib/API/get-meals";
import CardsGrid from "./cards-grid";
import { setFilters } from "@/lib/set-filters";

type Props = {
  category?: string;
  queryName?: string;
};

async function MealsResults(props: Props) {
  const { category, queryName } = props;
  const filters = setFilters(category, queryName);
  const meals = await getMeals(filters);

  return <CardsGrid data={meals || []} />;
}

export default MealsResults;
