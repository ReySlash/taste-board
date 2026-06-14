import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Discover Meal And Cocktail Recipes",
  description:
    "Explore Taste Board for handpicked meals and cocktails with ingredients, instructions, and ideas for every taste.",
  pathname: "/",
});

export default function Home() {
  return (
    <section className="bg-white dark:bg-black">
      <main className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        <div className="relative h-[50vh] w-full lg:hidden">
          <Image
            src="/hero-light.png"
            alt="TasteBoard hero artwork"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right dark:hidden"
          />
          <Image
            src="/hero-dark.png"
            alt="TasteBoard hero artwork"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-right dark:block"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
        </div>

        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/hero-light.png"
            alt="TasteBoard hero artwork"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right dark:hidden"
          />
          <Image
            src="/hero-dark.png"
            alt="TasteBoard hero artwork"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-right dark:block"
          />
          <div className="absolute inset-y-0 left-0 w-[45vw] bg-linear-to-r from-white via-white/90 via-60% to-transparent dark:from-black dark:via-black/90" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent dark:from-black" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 px-6 pb-12 text-center lg:absolute lg:left-0 lg:top-1/2 lg:w-[48vw] lg:-translate-y-1/2 lg:items-start lg:px-16 lg:text-left">
          <h2 className="text-base text-[oklch(56.177%_0.18808_142.111)] lg:text-xl">
            DISCOVER. COOK. SIP. ENJOY.
          </h2>
          <h1 className="text-4xl leading-tight lg:text-5xl">
            Exceptional{" "}
            <span className="text-[oklch(56.177%_0.18808_142.111)]">
              recipes.
            </span>
            <br />
            Unforgettable{" "}
            <span className="text-[oklch(56.177%_0.18808_142.111)]">
              flavors.
            </span>
          </h1>
          <h2 className="text-base text-muted-foreground lg:text-xl">
            Explore hundreds of handpicked meals and cocktails <br /> from
            around the world. <br /> For every moment, every taste, every you.
          </h2>
          <div className="flex w-full max-w-sm gap-3 flex-row justify-center sm:gap-4 lg:justify-start">
            <Button className="min-w-35 py-5" variant="default">
              <Link
                className="flex h-full w-full items-center justify-center font-bold"
                href="/meals"
              >
                Explore Meals
              </Link>
            </Button>

            <Button
              className="min-w-35 py-5 font-bold dark:border-white/20"
              variant="outline"
            >
              <Link
                className="flex h-full w-full items-center justify-center"
                href="/cocktails"
              >
                Explore Cocktails
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </section>
  );
}
