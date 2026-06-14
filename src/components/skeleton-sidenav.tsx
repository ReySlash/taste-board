import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

function SkeletonSideNav() {
  const skeletonCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="shrink-0 p-2 md:hidden">
        <Skeleton className="h-9 w-24" />
      </div>
      <aside className="hidden h-full w-64 shrink-0 overflow-hidden border-r p-4 md:flex md:flex-col md:gap-4">
        <h4 className="text-2xl text-center font-bold">Filters</h4>
        <form className="grid grid-cols-3 justify-center gap-1 rounded items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="col-span-2 w-full p-1 border rounded"
          />
          <Button>Search</Button>
        </form>
        <h4 className="text-center text-2xl font-bold">Categories</h4>
        <ul className="flex flex-col gap-3">
          {skeletonCategories.map((category) => (
            <li className="text-center rounded-lg" key={category}>
              <Skeleton className="h-8 w-full" />
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default SkeletonSideNav;
