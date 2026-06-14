import type { Metadata } from "next";
import MealsResults from "@/components/meals-result";
import SideNav from "@/components/sidenav";
import SkeletonGrid from "@/components/skeleton-grid";
import { getCategories } from "@/lib/API/get-categories";
import { buildCanonicalPath, buildMetadata, truncateDescription } from "@/lib/seo";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ category?: string; queryName?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const queryName = searchParams.queryName?.trim();
  const category = searchParams.category?.trim();
  const pathname = buildCanonicalPath("/meals", {
    category,
    queryName,
  });

  if (queryName) {
    return buildMetadata({
      title: `Meal Results For "${queryName}"`,
      description: truncateDescription(
        `Browse meal recipes matching "${queryName}" on Taste Board, with ingredients, cooking steps, and full recipe details.`,
      ),
      pathname,
    });
  }

  if (category) {
    return buildMetadata({
      title: `${category} Meals`,
      description: truncateDescription(
        `Browse ${category} meal recipes on Taste Board, with ingredients, cooking steps, and full recipe details.`,
      ),
      pathname,
    });
  }

  return buildMetadata({
    title: "Browse Meals",
    description:
      "Discover meal recipes on Taste Board by category or search, with ingredients, cooking steps, and full recipe details.",
    pathname: "/meals",
  });
}

async function MealsPage(props: Props) {
  // getting categories
  const categories = await getCategories("meals");

  // fetching meals based on the selected category
  const searchParams = await props.searchParams;
  const category = searchParams.category || "Beef";
  const queryName = searchParams.queryName;

  return (
    <main className="mx-auto flex h-[calc(100dvh-2.5rem)] w-full overflow-hidden">
      <SideNav
        productType="meals"
        categories={categories}
        selectedCategory={category}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Suspense key={category} fallback={<SkeletonGrid />}>
          <MealsResults queryName={queryName} category={category} />
        </Suspense>
      </div>
    </main>
  );
}

export default MealsPage;
