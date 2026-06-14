import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import YoutubeCard from "@/components/youtube-card";
import { getYouTubeVideoThumbnail } from "@/lib/API/get-thumbnail";
import Image from "next/image";
import Link from "next/link";
import { getCocktailById } from "@/lib/API/get-cocktails";
import { buildMetadata, truncateDescription } from "@/lib/seo";
import { CocktailDetails } from "@/types/cocktails";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/favorite-button";

type Props = {
  params: Promise<{ id: string }>;
};

function parseInstructions(instructions: string) {
  return instructions
    .replace(/[\u200B-\u200D\uFEFF\u2800]/g, "")
    .split(".")
    .map((instruction) => instruction.trim())
    .filter(Boolean);
}

function buildCocktailDescription(cocktail: CocktailDetails) {
  const category = cocktail.strCategory?.trim();
  const alcoholic = cocktail.strAlcoholic?.trim();
  const glass = cocktail.strGlass?.trim();
  const iba = cocktail.strIBA?.trim();
  const segments = [category, alcoholic, glass ? `served in a ${glass}` : null]
    .filter(Boolean)
    .join(", ");

  const parts = [
    segments
      ? `Explore ${cocktail.strDrink}, a cocktail featuring ${segments} on Taste Board.`
      : `Explore ${cocktail.strDrink} on Taste Board.`,
    iba ? `IBA classification: ${iba}.` : null,
    !iba && cocktail.strInstructions
      ? truncateDescription(cocktail.strInstructions, 90)
      : null,
  ].filter(Boolean);

  return truncateDescription(parts.join(" "));
}

async function getCocktailOrNotFound(id: string) {
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const data = await getCocktailById(id);
  const cocktail = data.drinks?.[0];

  if (!cocktail) {
    notFound();
  }

  return cocktail;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const cocktail = await getCocktailOrNotFound(id);

  return buildMetadata({
    title: cocktail.strDrink,
    description: buildCocktailDescription(cocktail),
    pathname: `/cocktails/${id}`,
    ogImage: cocktail.strDrinkThumb,
  });
}

async function MealDetailsPage(props: Props) {
  const { id } = await props.params;
  const cocktail = await getCocktailOrNotFound(id);

  let youtubeThumbnail: string | null = null;
  if (cocktail.strVideo) {
    youtubeThumbnail = await getYouTubeVideoThumbnail(cocktail.strVideo);
  }

  return (
    <main className="mx-auto min-h-0 flex-1 w-full overflow-y-auto">
      <div className="container mx-auto grid grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
        <article className="grid-item relative col-span-1 flex h-[400px] items-center justify-center">
          <Image
            className="w-full rounded-2xl object-cover"
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
          />
        </article>
        <article className="grid-item col-span-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between relative">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {cocktail.strDrink}
              </h2>
              <FavoriteButton
                item={{
                  id,
                  productType: "cocktails",
                  title: cocktail.strDrink,
                  description: buildCocktailDescription(cocktail),
                  image: cocktail.strDrinkThumb,
                }}
              />
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary">
                <h3 className="text-xl">{cocktail.strCategory}</h3>
              </Badge>
              {cocktail.strAlcoholic && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{cocktail.strAlcoholic}</h3>
                </Badge>
              )}
              {cocktail.strIBA && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{cocktail.strIBA}</h3>
                </Badge>
              )}
            </div>
            <div className="flex gap-4">
              {cocktail.strGlass && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{cocktail.strGlass}</h3>
                </Badge>
              )}
            </div>
          </div>
          {cocktail.strVideo && (
            <YoutubeCard
              tutorialLink={cocktail.strVideo}
              youtubeThumbnail={youtubeThumbnail || undefined}
            />
          )}
        </article>
        <article className="grid-item col-span-1 flex flex-col gap-2 md:px-10">
          <h2 className="text-4xl">Ingredients</h2>
          <ul>
            {Object.entries(cocktail).map(([key, value]) => {
              if (key.startsWith("strIngredient") && value) {
                return (
                  <li key={key}>
                    {"- "} {value} :{" "}
                    {
                      cocktail[
                        key.replace(
                          "strIngredient",
                          "strMeasure",
                        ) as keyof CocktailDetails
                      ]
                    }
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </article>
        <article className="grid-item col-span-1 flex flex-col gap-4">
          <h2 className="text-4xl">Instructions</h2>
          <div className="gap-2">
            {parseInstructions(cocktail.strInstructions).map(
              (instruction, index) => (
                <p key={index}>
                  <Badge className="p-1">{index + 1}</Badge>
                  {" - "}
                  {instruction}
                  {"."}
                </p>
              ),
            )}
          </div>
          <div className="flex w-full justify-center">
            <Link
              className="w-35 py-2 bg-[oklch(56.177%_0.18808_142.111)] rounded-xl text-center"
              href="/cocktails"
            >
              Back to cocktails
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

export default MealDetailsPage;
