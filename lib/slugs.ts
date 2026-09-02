/**
 * Category + slug utilities shared by the hub, mega-menu, landings and
 * internal-link blocks. The 5 categories are fixed (guide §8/§11);
 * the condition data itself lands in `content/conditions.ts` (Phase 1).
 */

export const CATEGORIES = [
  "Neurologic",
  "Psihic & Emoțional",
  "Somn",
  "Cognitiv",
  "Performanță",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Absolute path for a condition landing page. Routes are flat (`/adhd`). */
export function conditionPath(slug: string): string {
  return `/${slug}`;
}

/** Group an array of slug-bearing items by their `category` field. */
export function groupByCategory<T extends { category: Category }>(
  items: readonly T[],
): Record<Category, T[]> {
  const groups = Object.fromEntries(
    CATEGORIES.map((c) => [c, [] as T[]]),
  ) as Record<Category, T[]>;
  for (const item of items) groups[item.category].push(item);
  return groups;
}
