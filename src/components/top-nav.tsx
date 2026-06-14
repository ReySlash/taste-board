"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { PiChefHatDuotone } from "react-icons/pi";
import { LiaCocktailSolid } from "react-icons/lia";

function TopNav() {
  const pathname = usePathname();

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
      <div>
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
      <ModeToggle />
    </header>
  );
}
export default TopNav;
