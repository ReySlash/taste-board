import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./favorite-button";

export function RecipeCard(props: {
  productType: "meals" | "cocktails";
  id: string;
  title: string;
  description: string;
  image: string;
}) {
  const { productType, id, title, description, image } = props;
  return (
    <Card className="mx-auto h-full w-full pt-0">
      <div className="relative aspect-video w-full">
        <Image
          src={image}
          alt="Recipe cover"
          fill
          className="rounded-t-xl object-cover"
        />
        <div className="absolute inset-0 z-10 bg-black/35" />
        <FavoriteButton
          item={{
            id,
            productType,
            title,
            description,
            image,
          }}
        />
      </div>

      <CardHeader className="h-full">
        {description && (
          <CardAction>
            <Badge variant="secondary">{description}</Badge>
          </CardAction>
        )}
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardFooter className="py-2">
        <Link
          href={`/${productType}/${id}`}
          className="w-full rounded-md bg-[oklch(56.177%_0.18808_142.111)] py-1 text-center text-white"
        >
          View Recipe
        </Link>
      </CardFooter>
    </Card>
  );
}
