import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-white dark:bg-black">
      <main className="relative min-h-screen overflow-hidden bg-white dark:bg-black">
        <div className="relative h-[50vh] w-full md:hidden">
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

        <div className="absolute inset-0 hidden md:block">
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

        <div className="relative z-10 flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 px-6 pb-12 text-center md:absolute md:left-0 md:top-1/2 md:w-[48vw] md:-translate-y-1/2 md:items-start md:px-16 md:text-left">
          <h2 className="text-base text-[oklch(56.177%_0.18808_142.111)] md:text-xl">
            DISCOVER. COOK. SIP. ENJOY.
          </h2>
          <h1 className="text-4xl leading-tight md:text-5xl">
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
          <h2 className="text-base text-muted-foreground md:text-xl">
            Explore hundreds of handpicked meals and cocktails <br /> from
            around the world. <br /> For every moment, every taste, every you.
          </h2>
          <div className="flex w-full max-w-sm gap-3 flex-row justify-center sm:gap-4 md:justify-start">
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
