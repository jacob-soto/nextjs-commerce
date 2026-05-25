/**
 * Real supplier data for body.app, sourced from the public
 * jcnrs3/best-dropshipping-tools repository on GitHub.
 *
 * The README is fetched + parsed at request time (with Next.js fetch
 * caching) so the app stays in sync with upstream edits without
 * needing a redeploy.
 *
 *   https://github.com/jcnrs3/best-dropshipping-tools
 */

const README_URL =
  "https://raw.githubusercontent.com/jcnrs3/best-dropshipping-tools/main/README.md";

export interface Supplier {
  /** Stable slug derived from the supplier name, e.g. "spocket". */
  slug: string;
  /** Display name, e.g. "Spocket". */
  name: string;
  /** Canonical homepage URL. */
  url: string;
  /** One-sentence tagline (first paragraph after the heading). */
  tagline: string;
  /** First two paragraphs of the long description. */
  description: string;
  /** Inferred shop category based on keyword matching. */
  shop: "designer" | "intimates" | "athletics";
  /** Stable NYC-area coordinates derived from the slug. */
  lat: number;
  lng: number;
  /** Favicon URL for the supplier's domain. */
  avatar: string;
}

/**
 * Parse the README markdown into a list of suppliers.
 *
 * Each supplier is a level-2 heading of the form
 *   `## **[Name](https://example.com)**`
 * followed by a tagline paragraph, an image, and one or more
 * description paragraphs.
 */
function parseSuppliers(markdown: string): Supplier[] {
  const headingRe = /^##\s+\*\*\[([^\]]+)\]\(([^)]+)\)\*\*\s*$/;
  const lines = markdown.split("\n");
  const suppliers: Supplier[] = [];

  let current: { name: string; url: string; paragraphs: string[] } | null =
    null;
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (!current) return;
    const text = buffer.join(" ").trim();
    buffer = [];
    if (!text) return;
    if (text.startsWith("![")) return; // skip image lines
    current.paragraphs.push(text);
  };

  const flushSupplier = () => {
    if (!current) return;
    flushParagraph();
    const { name, url, paragraphs } = current;
    if (paragraphs.length > 0) {
      suppliers.push(buildSupplier(name, url, paragraphs));
    }
    current = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const match = headingRe.exec(line);
    if (match) {
      flushSupplier();
      current = {
        name: match[1]!.trim(),
        url: match[2]!.trim(),
        paragraphs: [],
      };
      continue;
    }
    if (!current) continue;
    if (line.trim() === "") {
      flushParagraph();
    } else {
      buffer.push(line.trim());
    }
  }
  flushSupplier();

  return suppliers;
}

function buildSupplier(
  name: string,
  url: string,
  paragraphs: string[],
): Supplier {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const tagline = paragraphs[0] ?? "";
  const description = paragraphs.slice(0, 3).join("\n\n");
  const shop = inferShop(`${name} ${description}`.toLowerCase());
  const { lat, lng } = coordsForSlug(slug);
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    host = "";
  }
  const avatar = host
    ? `https://www.google.com/s2/favicons?domain=${host}&sz=64`
    : "";
  return {
    slug,
    name,
    url,
    tagline,
    description,
    shop,
    lat,
    lng,
    avatar,
  };
}

const SHOP_KEYWORDS: Record<"designer" | "intimates" | "athletics", string[]> =
  {
    designer: [
      "fashion",
      "clothing",
      "apparel",
      "designer",
      "boutique",
      "streetwear",
      "print-on-demand",
      "print on demand",
      "branded",
      "custom",
      "trendsi",
      "wear",
    ],
    intimates: [
      "intimate",
      "lingerie",
      "underwear",
      "beauty",
      "cosmetic",
      "wellness",
      "self-care",
    ],
    athletics: [
      "athletic",
      "sport",
      "fitness",
      "supplement",
      "gym",
      "equipment",
      "performance",
      "outdoor",
    ],
  };

function inferShop(haystack: string): Supplier["shop"] {
  let best: Supplier["shop"] = "designer";
  let bestCount = 0;
  for (const shop of ["designer", "intimates", "athletics"] as const) {
    let count = 0;
    for (const kw of SHOP_KEYWORDS[shop]) {
      if (haystack.includes(kw)) count += 1;
    }
    if (count > bestCount) {
      best = shop;
      bestCount = count;
    }
  }
  return best;
}

/**
 * Cheap deterministic FNV-1a 32-bit hash. Used to spread suppliers
 * across the NYC viewport without any randomness so the layout is
 * stable across renders / deploys.
 */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function coordsForSlug(slug: string): { lat: number; lng: number } {
  const h1 = hash(slug);
  const h2 = hash(`${slug}:lng`);
  const dx = (h1 % 10000) / 10000 - 0.5; // -0.5..0.5
  const dy = (h2 % 10000) / 10000 - 0.5;
  return {
    lat: 40.7549 + dx * 0.04,
    lng: -73.984 + dy * 0.04,
  };
}

/**
 * Fetch the upstream README and return parsed suppliers.
 *
 * Cached via Next.js for 1 hour. On any error the function returns
 * an empty array so that callers can render an empty-state UI
 * instead of crashing the route.
 */
export async function getSuppliers(): Promise<Supplier[]> {
  try {
    const res = await fetch(README_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const md = await res.text();
    return parseSuppliers(md);
  } catch {
    return [];
  }
}

export async function getSuppliersByShop(
  shop: Supplier["shop"],
): Promise<Supplier[]> {
  const all = await getSuppliers();
  return all.filter((s) => s.shop === shop);
}
