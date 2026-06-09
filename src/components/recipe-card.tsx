import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function CardImage(props: {
  title: string;
  description: string;
  image: string;
}) {
  const { title, description, image } = props;
  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        src={image}
        alt="Recipe cover"
        className="relative z-20 aspect-video w-full object-cover"
        width={400}
        height={400}
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>
  );
}
