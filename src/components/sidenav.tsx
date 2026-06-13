import Link from "next/link";
import { Button } from "./ui/button";
import Form from "next/form";

type Props = {
  categories: string[] | undefined;
  selectedCategory: string;
};

function SideNav({ categories, selectedCategory }: Props) {
  return (
    <aside className="w-64 h-full border-r border-slate-800 p-4 flex flex-col gap-4">
      <h4 className="text-2xl text-center font-bold">Filters</h4>
      <Form
        action="/meals"
        className="grid grid-cols-3 justify-center gap-1 rounded items-center"
      >
        <input
          type="text"
          name="queryName"
          placeholder="Search by name..."
          className="col-span-2 w-full p-1 border border-slate-800 rounded"
        />
        <Button>Search</Button>
      </Form>
      <h4 className="text-center text-2xl font-bold">Categories</h4>
      <ul className="flex flex-col gap-1">
        {categories?.map((category) => (
          <li className="text-center rounded-lg" key={category}>
            {selectedCategory === category ? (
              <span className="w-full border border-slate-800 bg-slate-800 rounded-lg block">
                {category}
              </span>
            ) : (
              <Link
                href={`/meals?category=${category}`}
                className="w-full border border-slate-800 hover:bg-slate-800 rounded-lg block"
              >
                {category}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideNav;
