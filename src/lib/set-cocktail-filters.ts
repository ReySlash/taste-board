export function setCocktailsFilters(category?: string, queryName?: string) {
  if (!category && !queryName) {
    return ["filter", "c=Beer"];
  }
  if (queryName) {
    return ["search", `s=${queryName}`];
  }
  return ["filter", `c=${category}`];
}
