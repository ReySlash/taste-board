import type { Metadata } from "next";
import CocktailsResult from "@/components/cocktails-result";
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
  const pathname = buildCanonicalPath("/cocktails", {
    category,
    queryName,
  });

  if (queryName) {
    return buildMetadata({
      title: `Cocktail Results For "${queryName}"`,
      description: truncateDescription(
        `Browse cocktail recipes matching "${queryName}" on Taste Board, with ingredients, glassware, and full drink details.`,
      ),
      pathname,
    });
  }

  if (category) {
    return buildMetadata({
      title: `${category} Cocktails`,
      description: truncateDescription(
        `Browse ${category} cocktails on Taste Board, with ingredients, glassware, and full drink details.`,
      ),
      pathname,
    });
  }

  return buildMetadata({
    title: "Browse Cocktails",
    description:
      "Discover cocktail recipes on Taste Board by category or search, with ingredients, glassware, and full drink details.",
    pathname: "/cocktails",
  });
}

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
