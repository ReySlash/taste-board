import type { ComponentProps } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SideNav from "@/components/sidenav";

vi.mock("next/form", () => ({
  default: ({
    children,
    ...props
  }: ComponentProps<"form">) => <form {...props}>{children}</form>,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: ComponentProps<"a"> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SideNav", () => {
  const categories = ["Beef", "Chicken", "Dessert"];

  it("opens the mobile drawer from the filters button and closes from the close button", async () => {
    const user = userEvent.setup();
    render(
      <SideNav
        productType="meals"
        categories={categories}
        selectedCategory="Beef"
      />,
    );

    const openButton = screen.getByRole("button", { name: "Open filters menu" });
    const mobileDrawer = document.getElementById("meals-mobile-filters");

    expect(openButton.getAttribute("aria-expanded")).toBe("false");
    expect(mobileDrawer?.getAttribute("data-state")).toBe("closed");

    await user.click(openButton);

    expect(openButton.getAttribute("aria-expanded")).toBe("true");
    expect(mobileDrawer?.getAttribute("data-state")).toBe("open");

    const closeButtons = screen.getAllByRole("button", {
      name: "Close filters menu",
    });
    await user.click(closeButtons[closeButtons.length - 1]);

    expect(openButton.getAttribute("aria-expanded")).toBe("false");
    expect(mobileDrawer?.getAttribute("data-state")).toBe("closed");
  });

  it("closes when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SideNav
        productType="cocktails"
        categories={categories}
        selectedCategory="Beef"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open filters menu" }));

    const backdrop = container.querySelector('div[data-state="open"]');
    expect(backdrop).toBeTruthy();

    fireEvent.click(backdrop!);

    expect(
      document
        .getElementById("cocktails-mobile-filters")
        ?.getAttribute("data-state"),
    ).toBe("closed");
  });

  it("renders the selected category as non-link content and other categories as links", () => {
    render(
      <SideNav
        productType="meals"
        categories={categories}
        selectedCategory="Beef"
      />,
    );

    const selectedCategory = screen.getAllByText("Beef")[0];
    expect(selectedCategory.closest("a")).toBeNull();

    const chickenLinks = screen.getAllByRole("link", { name: "Chicken" });
    expect(chickenLinks[0].getAttribute("href")).toBe("/meals?category=Chicken");
  });
});
