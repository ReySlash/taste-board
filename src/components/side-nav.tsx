import { Button } from "./ui/button";

function SideNav() {
  return (
    <aside className="w-64 h-full shrink-0 overflow-hidden border-r border-slate-800 p-4 flex flex-col gap-4">
      <h4 className="text-2xl">Filters</h4>
      <form className="grid grid-cols-3 justify-center gap-1 rounded items-center">
        <input
          type="text"
          placeholder="Search..."
          className="col-span-2 w-full p-2 border border-slate-800 rounded"
        />
        <Button>Search</Button>
      </form>
      <ul className="flex flex-col gap-2">Categories:</ul>
    </aside>
  );
}

export default SideNav;
