import Link from "next/link";
import { Button } from "./ui/button";
import Form from "next/form";

type Props = {
  productType: "meals" | "cocktails";
  categories: string[] | undefined;
  selectedCategory: string;
};

function SideNav({ productType, categories, selectedCategory }: Props) {
  return (
    <aside className="h-full w-64 shrink-0 border-r p-4">
      <div className="flex h-full flex-col gap-4">
        <h4 className="text-2xl text-center font-bold">Filters</h4>
        <Form
          action={`/${productType}`}
          className="grid grid-cols-3 items-center justify-center gap-1 rounded"
        >
          <input
            type="text"
            name="queryName"
            placeholder="Search by name..."
            className="col-span-2 w-full rounded border p-1"
          />
          <Button>Search</Button>
        </Form>
        <h4 className="text-center text-2xl font-bold">Categories</h4>
        <ul className="flex flex-col gap-1">
          {categories?.map((category) => (
            <li className="text-center rounded-lg" key={category}>
              {selectedCategory === category ? (
                <span className="block w-full rounded-lg border bg-gray-200 dark:bg-black/35">
                  {category}
                </span>
              ) : (
                <Button variant="outline" className="w-full">
                  <Link
                    href={`/${productType}?category=${category}`}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {category}
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideNav;
