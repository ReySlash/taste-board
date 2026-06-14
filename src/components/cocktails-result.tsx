import { getCocktails } from "@/lib/API/get-cocktails";
import CardsGrid from "./cards-grid";
import { setCocktailsFilters } from "@/lib/set-cocktail-filters";

type Props = {
  category?: string;
  queryName?: string;
};

async function CocktailsResult(props: Props) {
  const { category, queryName } = props;
  const filters = setCocktailsFilters(category, queryName);
  const cocktails = await getCocktails(filters);

  return <CardsGrid cocktailsData={cocktails || []} />;
}

export default CocktailsResult;
