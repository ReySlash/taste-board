import { Button } from "./ui/button";

type Props = {
  categories?: Promise<string[]>;
};

async function SideNav(props: Props) {
  const { categories } = props;

  return (
    <aside className="w-64 h-full shrink-0 overflow-hidden border-r border-slate-800 p-4 flex flex-col gap-4">
      <h4 className="text-2xl text-center font-bold">Filters</h4>
      <form className="grid grid-cols-3 justify-center gap-1 rounded items-center">
        <input
          type="text"
          placeholder="Search..."
          className="col-span-2 w-full p-1 border border-slate-800 rounded"
        />
        <Button>Search</Button>
      </form>
      <h4 className="text-center text-2xl font-bold">Categories</h4>
      <ul className="flex flex-col gap-1">
        {categories ? (
          (await categories).map((category) => (
            <li className="text-center rounded-lg p-1" key={category}>
              {category}
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </aside>
  );
}

export default SideNav;
