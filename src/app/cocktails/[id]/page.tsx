import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import YoutubeCard from "@/components/youtube-card";
import { getYouTubeVideoThumbnail } from "@/lib/API/get-thumbnail";
import Image from "next/image";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import { getCocktailById } from "@/lib/API/get-cocktails";
import { buildMetadata, truncateDescription } from "@/lib/seo";
import { CocktailDetails } from "@/types/cocktails";

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

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const data = await getCocktailById(id);
  const cocktail = data.drinks[0];

  return buildMetadata({
    title: cocktail.strDrink,
    description: buildCocktailDescription(cocktail),
    pathname: `/cocktails/${id}`,
    ogImage: cocktail.strDrinkThumb,
  });
}

async function MealDetailsPage(props: Props) {
  const { id } = await props.params;

  const data = await getCocktailById(id);

  let youtubeThumbnail: string | null = null;
  if (data.drinks[0].strVideo) {
    youtubeThumbnail = await getYouTubeVideoThumbnail(data.drinks[0].strVideo);
  }

  return (
    <main className="mx-auto min-h-0 flex-1 w-full overflow-y-auto">
      <div className="container mx-auto grid grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
        <article className="grid-item relative col-span-1 flex h-[400px] items-center justify-center">
          <Image
            className="w-full rounded-2xl object-cover"
            src={data.drinks[0].strDrinkThumb}
            alt={data.drinks[0].strDrink}
            fill
          />
        </article>
        <article className="grid-item col-span-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {data.drinks[0].strDrink}
              </h2>
              <Button variant={"outline"}>
                <IoIosHeart className="text-red-500" />
              </Button>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary">
                <h3 className="text-xl">{data.drinks[0].strCategory}</h3>
              </Badge>
              {data.drinks[0].strAlcoholic && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{data.drinks[0].strAlcoholic}</h3>
                </Badge>
              )}
              {data.drinks[0].strIBA && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{data.drinks[0].strIBA}</h3>
                </Badge>
              )}
            </div>
            <div className="flex gap-4">
              {data.drinks[0].strGlass && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{data.drinks[0].strGlass}</h3>
                </Badge>
              )}
            </div>
          </div>
          {data.drinks[0].strVideo && (
            <YoutubeCard
              tutorialLink={data.drinks[0].strVideo}
              youtubeThumbnail={youtubeThumbnail || undefined}
            />
          )}
        </article>
        <article className="grid-item col-span-1 flex flex-col gap-2 md:px-10">
          <h2 className="text-4xl">Ingredients</h2>
          <ul>
            {Object.entries(data.drinks[0]).map(([key, value]) => {
              if (key.startsWith("strIngredient") && value) {
                return (
                  <li key={key}>
                    {"- "} {value} :{" "}
                    {
                      data.drinks[0][
                        key.replace(
                          "strIngredient",
                          "strMeasure",
                        ) as keyof (typeof data.drinks)[0]
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
            {parseInstructions(data.drinks[0].strInstructions).map(
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
