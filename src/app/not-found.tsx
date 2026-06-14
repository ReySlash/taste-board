import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you requested could not be found on Taste Board. Browse meals, cocktails, or head back home.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-0 flex-1 w-full items-center justify-center px-6 py-12">
      <section className="flex max-w-2xl flex-col items-center gap-5 text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-[oklch(56.177%_0.18808_142.111)]">
          404
        </p>
        <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl">
          Requested resource was not found.
        </h2>
        <p className="max-w-xl text-base text-muted-foreground lg:text-lg">
          The page you requested does not exist, may have moved, or the recipe
          ID is no longer available from the source API.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="min-w-40">
            <Link href="/">Back Home</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-40">
            <Link href="/meals">Browse Meals</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-40">
            <Link href="/cocktails">Browse Cocktails</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
