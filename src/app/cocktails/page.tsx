import CocktailsResult from "@/components/cocktails-result";
import SideNav from "@/components/sidenav";
import SkeletonGrid from "@/components/skeleton-grid";
import { getCategories } from "@/lib/API/get-categories";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ category?: string; queryName?: string }>;
};

async function CocktailsPage(props: Props) {
  // getting categories
  const categories = await getCategories("cocktails");

  // fetching meals based on the selected category
  const searchParams = await props.searchParams;
  const category = searchParams.category || "Beer";
  const queryName = searchParams.queryName;

  return (
    <main className="mx-auto flex min-h-0 flex-1 w-full overflow-hidden">
      <SideNav
        productType="cocktails"
        categories={categories}
        selectedCategory={category}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Suspense fallback={<SkeletonGrid />}>
          <CocktailsResult category={category} queryName={queryName} />
        </Suspense>
      </div>
    </main>
  );
}

export default CocktailsPage;
