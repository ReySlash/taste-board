import { Badge } from "@/components/ui/badge";
import { getMealById } from "@/lib/API/get-meals";
import { MealDetailsResponse } from "@/types/meals";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

async function MealDetailsPage(props: Props) {
  const { id } = await props.params;

  const data: MealDetailsResponse = await getMealById(id);

  return (
    <main className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 py-4 px-2">
      <article className="grid-item col-span-1 flex items-center justify-center">
        <Image
          className="object-cover rounded-2xl"
          src={data.meals[0].strMealThumb}
          alt={data.meals[0].strMeal}
          width={350}
          height={350}
        />
      </article>
      <article className="grid-item col-span-1 flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl font-bold">{data.meals[0].strMeal}</h2>
        <div className="flex gap-4">
          <Badge variant="secondary">
            <h3 className="text-xl">{data.meals[0].strCategory}</h3>
          </Badge>
          <Badge variant="secondary">
            <h3 className="text-xl">{data.meals[0].strArea}</h3>
          </Badge>
        </div>
        <div className="flex gap-4">
          {data.meals[0].strTags &&
            data.meals[0].strTags.split(",").map((tag) => (
              <Badge key={tag} variant="secondary">
                <h3 className="text-xl">{tag.trim()}</h3>
              </Badge>
            ))}
        </div>
      </article>
      <article className="grid-item col-span-1 flex flex-col gap-2 justify-start items-center">
        <h2 className="text-4xl">Ingredients</h2>

        {Object.entries(data.meals[0]).map(([key, value]) => {
          if (key.startsWith("strIngredient") && value) {
            return (
              <p key={key}>
                {"- "} {value}
              </p>
            );
          }
          return null;
        })}
      </article>
      <article className="grid-item col-span-1 flex flex-col items-center">
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
              </p>
            ))}
        </div>
      </article>
    </main>
  );
}

export default MealDetailsPage;
