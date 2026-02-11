/**
 * Golden Ratio Constants
 * 
 * The golden ratio (φ ≈ 1.618) creates aesthetically pleasing proportions.
 * For layout splits, we use:
 * - MAJOR: 0.618 (61.8%) - the larger section
 * - MINOR: 0.382 (38.2%) - the smaller section
 * 
 * These values sum to 1.0 and maintain the golden ratio relationship.
 */

export const GOLDEN_RATIO = {
  /** The larger portion in a golden ratio split (61.8%) */
  MAJOR: 0.618,
  /** The smaller portion in a golden ratio split (38.2%) */
  MINOR: 0.382,
  /** The golden ratio constant φ (phi) ≈ 1.618 */
  PHI: 1.618,
} as const;

/**
 * Convert golden ratio decimal to percentage string
 */
export function toPercent(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`;
}
