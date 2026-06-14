"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

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
    <header className="flex flex-row justify-between items-center h-10 py-4 px-4 sticky top-0 bg-white dark:bg-black border-b z-50">
      <h1 className="text-2xl font-bold">Taste Board</h1>
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
