import CardsGrid from "@/components/cards-grid";
import SideNav from "@/components/side-nav";
import { getCategories } from "@/lib/API/categories";

const categories = getCategories();

function MealsPage() {
  return (
    <div className="mx-auto flex h-full w-full overflow-hidden">
      <SideNav categories={categories} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <CardsGrid />
      </div>
    </div>
  );
}

export default MealsPage;
