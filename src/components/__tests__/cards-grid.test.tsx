import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CardsGrid from "@/components/cards-grid";
import type { CocktailSummary } from "@/types/cocktails";
import type { MealSummary } from "@/types/meals";

vi.mock("@/components/recipe-card", () => ({
  RecipeCard: ({
    productType,
    title,
  }: {
    productType: "meals" | "cocktails";
    title: string;
  }) => <div>{`${productType}:${title}`}</div>,
}));

const meals: MealSummary[] = [
  {
    idMeal: "meal-1",
    strMeal: "Meal One",
    strMealThumb: "/meal.jpg",
    strArea: "Cuban",
    strCountry: "Cuban",
  },
];

const cocktails: CocktailSummary[] = [
  {
    idDrink: "drink-1",
    strDrink: "Drink One",
    strDrinkThumb: "/drink.jpg",
  },
];

describe("CardsGrid", () => {
  it("shows the empty state when no data is provided", () => {
    render(<CardsGrid />);

    expect(screen.getByText("No recipes found.")).toBeTruthy();
  });

  it("renders meal cards when mealsData exists", () => {
    render(<CardsGrid mealsData={meals} />);

    expect(screen.getByText("meals:Meal One")).toBeTruthy();
  });

  it("renders cocktail cards when cocktailsData exists", () => {
    render(<CardsGrid cocktailsData={cocktails} />);

    expect(screen.getByText("cocktails:Drink One")).toBeTruthy();
  });

  it("renders mixed content when both arrays are present", () => {
    render(<CardsGrid mealsData={meals} cocktailsData={cocktails} />);

    expect(screen.getByText("meals:Meal One")).toBeTruthy();
    expect(screen.getByText("cocktails:Drink One")).toBeTruthy();
  });
});
