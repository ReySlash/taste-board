import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export function RecipeCard(props: {
  id: string;
  title: string;
  description: string;
  image: string;
}) {
  const { id, title, description, image } = props;
  return (
    <Card className="relative mx-auto w-full pt-0 h-full">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={image}
        alt="Recipe cover"
        className="relative z-20 aspect-video w-full object-cover"
        width={400}
        height={400}
      />
      <CardHeader className="h-full">
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="py-2">
        <Link
          href={`/meals/${id}`}
          className="w-full bg-[oklch(56.177%_0.18808_142.111)] text-white py-1 rounded-md text-center"
        >
          View Recipe
        </Link>
      </CardFooter>
    </Card>
  );
}
