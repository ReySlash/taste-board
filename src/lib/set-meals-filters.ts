export function setMealsFilters(category?: string, queryName?: string) {
  if (!category && !queryName) {
    return ["filter", "c=beef"];
  }
  if (queryName) {
    return ["search", `s=${queryName}`];
  }
  return ["filter", `c=${category}`];
}
