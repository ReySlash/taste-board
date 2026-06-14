import type { Metadata } from "next";

export const SITE_NAME = "Taste Board";
export const DEFAULT_DESCRIPTION =
  "Discover meals and cocktails with curated recipes, ingredient lists, and step-by-step instructions on Taste Board.";
export const DEFAULT_SOCIAL_IMAGE = "/hero-light.png";

type BuildMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
  robots?: Metadata["robots"];
};

export function getMetadataBase() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      return new URL(configuredSiteUrl);
    } catch {
      // Fall through to the localhost safety fallback.
    }
  }

  return new URL("http://localhost:3000");
}

export function buildCanonicalPath(
  pathname: string,
  searchParams?: Record<string, string | undefined>,
) {
  if (!searchParams) {
    return pathname;
  }

  const params = new URLSearchParams();

  for (const key of Object.keys(searchParams).sort()) {
    const value = searchParams[key]?.trim();

    if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function truncateDescription(
  value: string,
  maxLength = 160,
) {
  const normalizedValue = value.replace(/\s+/g, " ").trim();

  if (normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildMetadata({
  title,
  description,
  pathname,
  ogImage = DEFAULT_SOCIAL_IMAGE,
  robots,
}: BuildMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots,
  };
}
