import MealsResults from "@/components/meals-result";
import SideNav from "@/components/sidenav";
import SkeletonGrid from "@/components/skeleton-grid";
import { getCategories } from "@/lib/API/get-categories";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ category?: string; queryName?: string }>;
};

async function MealsPage(props: Props) {
  // getting categories
  const categories = await getCategories();

  // fetching meals based on the selected category
  const searchParams = await props.searchParams;
  const category = searchParams.category || "beef";
  const queryName = searchParams.queryName;

  return (
    <div className="mx-auto flex h-full w-full overflow-hidden">
      <SideNav categories={categories} selectedCategory={category} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Suspense key={category} fallback={<SkeletonGrid />}>
          <MealsResults queryName={queryName} category={category} />
        </Suspense>
      </div>
    </div>
  );
}

export default MealsPage;
