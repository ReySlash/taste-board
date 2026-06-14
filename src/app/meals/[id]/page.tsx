import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import YoutubeCard from "@/components/youtube-card";
import { getYouTubeVideoThumbnail } from "@/lib/API/get-thumbnail";
import { getMealById } from "@/lib/API/get-meals";
import { buildMetadata, truncateDescription } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/favorite-button";
import { FavoriteItem } from "@/lib/favorites";
import { MealDetails } from "@/types/meals";

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

function buildMealDescription(meal: MealDetails) {
  const tags = meal.strTags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const category = meal.strCategory?.trim();
  const area = meal.strArea?.trim();
  const summary = [
    category ? `${category} recipe` : null,
    area ? `from ${area}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const parts = [
    summary
      ? `Explore ${meal.strMeal}, a ${summary} on Taste Board.`
      : `Explore ${meal.strMeal} on Taste Board.`,
    tags?.length ? `Tags: ${tags.join(", ")}.` : null,
    !tags?.length && meal.strInstructions
      ? truncateDescription(meal.strInstructions, 90)
      : null,
  ].filter(Boolean);

  return truncateDescription(parts.join(" "));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const data = await getMealById(id);
  const meal = data.meals[0];

  return buildMetadata({
    title: meal.strMeal,
    description: buildMealDescription(meal),
    pathname: `/meals/${id}`,
    ogImage: meal.strMealThumb,
  });
}

async function MealDetailsPage(props: Props) {
  const { id } = await props.params;

  const data = await getMealById(id);

  let youtubeThumbnail: string | null = null;
  if (data.meals[0].strYoutube) {
    youtubeThumbnail = await getYouTubeVideoThumbnail(data.meals[0].strYoutube);
  }

  const favoriteItem: FavoriteItem = {
    id: data.meals[0].idMeal,
    productType: "meals",
    title: data.meals[0].strMeal,
    description: data.meals[0].strArea,
    image: data.meals[0].strMealThumb,
  };

  return (
    <main className="mx-auto min-h-0 flex-1 w-full overflow-y-auto">
      <div className="container mx-auto grid grid-cols-1 gap-2 px-2 py-4 md:grid-cols-2">
        <article className="grid-item relative col-span-1 flex h-[400px] items-center justify-center">
          <Image
            className="w-full rounded-2xl object-cover"
            src={data.meals[0].strMealThumb}
            alt={data.meals[0].strMeal}
            fill
          />
        </article>
        <article className="grid-item col-span-1 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between relative">
              <h2 className="text-3xl font-bold lg:text-4xl">
                {data.meals[0].strMeal}
              </h2>
              <FavoriteButton item={favoriteItem} />
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary">
                <h3 className="text-xl">{data.meals[0].strCategory}</h3>
              </Badge>
              {data.meals[0].strArea && (
                <Badge variant="secondary">
                  <h3 className="text-xl">{data.meals[0].strArea}</h3>
                </Badge>
              )}
            </div>
            <div className="flex gap-4">
              {data.meals[0].strTags &&
                data.meals[0].strTags.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <h3 className="text-xl">{tag.trim()}</h3>
                  </Badge>
                ))}
            </div>
          </div>
          {data.meals[0].strYoutube && (
            <YoutubeCard
              tutorialLink={data.meals[0].strYoutube}
              youtubeThumbnail={youtubeThumbnail || undefined}
            />
          )}
        </article>
        <article className="grid-item col-span-1 flex flex-col gap-2 md:px-10">
          <h2 className="text-4xl">Ingredients</h2>
          <ul>
            {Object.entries(data.meals[0]).map(([key, value]) => {
              if (key.startsWith("strIngredient") && value) {
                return (
                  <li key={key}>
                    {"- "} {value} :{" "}
                    {
                      data.meals[0][
                        key.replace(
                          "strIngredient",
                          "strMeasure",
                        ) as keyof (typeof data.meals)[0]
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
            {parseInstructions(data.meals[0].strInstructions).map(
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
              href="/meals"
            >
              Back to meals
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

export default MealDetailsPage;
