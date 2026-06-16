type FetchJsonOptions = {
  revalidate: number;
};

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions,
): Promise<T> {
  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: options.revalidate },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
