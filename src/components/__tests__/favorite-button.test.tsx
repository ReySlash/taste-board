import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FavoriteButton from "@/components/favorite-button";
import {
  FAVORITES_KEY,
  writeFavorites,
  type FavoriteItem,
} from "@/lib/favorites";

const item: FavoriteItem = {
  id: "meal-1",
  productType: "meals",
  title: "Meal One",
  description: "Cuban",
  image: "/meal.jpg",
};

describe("FavoriteButton", () => {
  it("renders the add to favorites state when the item is not saved", () => {
    render(<FavoriteButton item={item} />);

    expect(
      screen.getByRole("button", { name: "Add to favorites" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("false");
  });

  it("adds the item to favorites and updates the pressed state", async () => {
    const user = userEvent.setup();
    render(<FavoriteButton item={item} />);

    await user.click(screen.getByRole("button", { name: "Add to favorites" }));

    expect(
      screen.getByRole("button", { name: "Remove from favorites" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("true");
    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe(
      JSON.stringify([item]),
    );
  });

  it("removes the item from favorites when clicked again", async () => {
    const user = userEvent.setup();
    render(<FavoriteButton item={item} />);

    const button = screen.getByRole("button", { name: "Add to favorites" });
    await user.click(button);
    await user.click(screen.getByRole("button", { name: "Remove from favorites" }));

    expect(
      screen.getByRole("button", { name: "Add to favorites" }).getAttribute(
        "aria-pressed",
      ),
    ).toBe("false");
    expect(window.localStorage.getItem(FAVORITES_KEY)).toBe(JSON.stringify([]));
  });

  it("responds to external favorites updates", async () => {
    render(<FavoriteButton item={item} />);

    writeFavorites([item]);

    await waitFor(() => {
      expect(
        screen
          .getByRole("button", { name: "Remove from favorites" })
          .getAttribute("aria-pressed"),
      ).toBe("true");
    });
  });
});
