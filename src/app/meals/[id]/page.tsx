import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import YoutubeCard from "@/components/youtube-card";
import { getMealById } from "@/lib/API/get-meals";
import { MealDetailsResponse } from "@/types/meals";
import Image from "next/image";

import { IoIosHeart } from "react-icons/io";

type Props = {
  params: Promise<{ id: string }>;
};

async function MealDetailsPage(props: Props) {
  const { id } = await props.params;

  const data: MealDetailsResponse = await getMealById(id);

  return (
    <main className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 py-4 px-2">
      <article className="grid-item col-span-1 flex items-center justify-center relative h-[400px]">
        <Image
          className="object-cover w-full rounded-2xl"
          src={data.meals[0].strMealThumb}
          alt={data.meals[0].strMeal}
          fill
        />
      </article>
      <article className="grid-item col-span-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {data.meals[0].strMeal}
            </h2>
            <Button variant={"outline"}>
              <IoIosHeart className="text-red-500" />
            </Button>
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
          <YoutubeCard tutorialLink={data.meals[0].strYoutube} />
        )}
      </article>
      <article className="grid-item col-span-1 flex flex-col gap-2  md:px-10">
        <h2 className="text-4xl">Ingredients</h2>

        {Object.entries(data.meals[0]).map(([key, value]) => {
          if (key.startsWith("strIngredient") && value) {
            return (
              <p key={key}>
                {"- "} {value} :{" "}
                {
                  data.meals[0][
                    key.replace(
                      "strIngredient",
                      "strMeasure",
                    ) as keyof (typeof data.meals)[0]
                  ]
                }
              </p>
            );
          }
          return null;
        })}
      </article>
      <article className="grid-item col-span-1 flex flex-col">
        <h2 className="text-4xl">Instructions</h2>
        <div className="gap-2">
          {data.meals[0].strInstructions
            .split(".")
            .map((instruction) => instruction.trim())
            .filter(Boolean)
            .map((instruction, index) => (
              <p key={index}>
                <Badge className="p-1">{index + 1}</Badge>
                {" - "}
                {instruction}
                {"."}
              </p>
            ))}
        </div>
      </article>
    </main>
  );
}

export default MealDetailsPage;
