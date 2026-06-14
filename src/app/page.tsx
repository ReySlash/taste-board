import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-white dark:bg-black">
      <main className="relative min-h-screen bg-[url('/hero-light.png')] bg-cover bg-center dark:bg-[url('/hero-dark.png')]">
        <div className="absolute inset-0 bg-linear-to-tl from-transparent from-50% via-white/80 dark:via-black/80 via-60% to-white dark:to-black" />

        <div className="w-[50vw] h-[94vh] relative z-10 flex flex-col items-center justify-center gap-2">
          <h2 className="text-xl text-[oklch(56.177%_0.18808_142.111)]">
            DISCOVER. COOK. SIP. ENJOY.
          </h2>
          <h1 className="text-5xl">
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
          <h2 className="text-xl">
            Explore hundreds of handpicked meals and cocktails <br /> from
            around the world. <br /> For every moment, every taste, every you.
          </h2>
          <div className="flex gap-4">
            <Button className="py-5 min-w-35" variant="default">
              <Link
                className="w-full h-full flex items-center justify-center font-bold"
                href="/meals"
              >
                Explore Meals
              </Link>
            </Button>

            <Button
              className="py-5 min-w-35 border border-black font-bold"
              variant="outline"
            >
              <Link
                className="w-full h-full flex items-center justify-center"
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
