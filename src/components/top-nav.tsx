import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

function TopNav() {
  return (
    <header className="flex flex-row justify-between items-center h-10 py-4 px-4 sticky top-0 bg-white dark:bg-black border-b border-gray-900 z-50">
      <h1 className="text-2xl font-bold">Taste Board</h1>
      <div>
        <nav>
          <ul className="flex gap-15">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/meals">Meals</Link>
            </li>
            <li>
              <Link href="/cocktails">Cocktails</Link>
            </li>
            <li>
              <Link href="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>
      <ModeToggle />
    </header>
  );
}
export default TopNav;
