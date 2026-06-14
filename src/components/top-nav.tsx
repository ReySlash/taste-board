"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { PiChefHatDuotone } from "react-icons/pi";
import { LiaCocktailSolid } from "react-icons/lia";
import { Button } from "./ui/button";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/meals", label: "Meals" },
    { href: "/cocktails", label: "Cocktails" },
    { href: "/favorites", label: "Favorites" },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-10 shrink-0 flex-row items-center justify-between border-b bg-white px-4 py-4 dark:bg-black">
      <div className="flex items-center gap-1">
        <PiChefHatDuotone className="text-4xl" />
        <LiaCocktailSolid className="text-4xl" />
      </div>
      <div className="hidden items-center gap-4 md:flex">
        <nav>
          <ul className="flex gap-15">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "hover:text-[oklch(56.177%_0.18808_142.111)]",
                    isActive(item.href) &&
                      "text-[oklch(56.177%_0.18808_142.111)]",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex gap-2">
        <div>
          <ModeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            size="icon"
            variant="outline"
            className="border-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <HiOutlineMenuAlt3 />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 flex h-screen w-72 flex-col border-l bg-background p-6 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <PiChefHatDuotone className="text-3xl" />
            <LiaCocktailSolid className="text-3xl" />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="border-none"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <HiX />
          </Button>
        </div>
        <nav>
          <ul className="flex flex-col gap-5 text-lg">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "block transition-colors hover:text-[oklch(56.177%_0.18808_142.111)]",
                    isActive(item.href) &&
                      "text-[oklch(56.177%_0.18808_142.111)]",
                  )}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
}
export default TopNav;
