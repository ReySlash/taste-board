"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Form from "next/form";
import { HiOutlineAdjustments, HiX } from "react-icons/hi";

type Props = {
  productType: "meals" | "cocktails";
  categories: string[] | undefined;
  selectedCategory: string;
};

function SideNav({ productType, categories, selectedCategory }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between md:block">
        <h4 className="text-2xl text-center font-bold">Filters</h4>
        <Button
          size="icon"
          variant="outline"
          className="border-none md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close filters menu"
        >
          <HiX />
        </Button>
      </div>
      <Form
        action={`/${productType}`}
        onSubmit={() => setMobileMenuOpen(false)}
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category}
                </Link>
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="shrink-0 p-2 md:hidden">
        <Button
          variant="outline"
          className="flex items-center gap-2 absolute z-50 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open filters menu"
        >
          <HiOutlineAdjustments />
          Filters
        </Button>
      </div>
      <aside className="hidden h-full w-64 shrink-0 border-r p-4 md:block">
        {content}
      </aside>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 border-r bg-background p-4 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </aside>
    </>
  );
}

export default SideNav;
