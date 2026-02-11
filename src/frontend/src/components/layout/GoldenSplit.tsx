import { cn } from '@/lib/utils';
import { GOLDEN_RATIO } from '@/lib/goldenRatio';

interface GoldenSplitProps {
  /** Content for the major (larger) section - 61.8% */
  major: React.ReactNode;
  /** Content for the minor (smaller) section - 38.2% */
  minor: React.ReactNode;
  /** If true, swaps major and minor positions (minor comes first) */
  reverse?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the major section */
  majorClassName?: string;
  /** Additional CSS classes for the minor section */
  minorClassName?: string;
}

/**
 * GoldenSplit Layout Component
 * 
 * Applies golden ratio proportions (~61.8% / 38.2%) to a two-panel layout.
 * - On small screens: stacks vertically
 * - On md+ screens: horizontal split with golden ratio
 * 
 * Usage:
 * <GoldenSplit
 *   major={<MainContent />}
 *   minor={<Sidebar />}
 * />
 */
export function GoldenSplit({
  major,
  minor,
  reverse = false,
  className,
  majorClassName,
  minorClassName,
}: GoldenSplitProps) {
  const majorWidth = `${GOLDEN_RATIO.MAJOR * 100}%`;
  const minorWidth = `${GOLDEN_RATIO.MINOR * 100}%`;

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row w-full gap-4 md:gap-6',
        className
      )}
    >
      {reverse ? (
        <>
          <div
            className={cn('w-full md:flex-shrink-0', minorClassName)}
            style={{ width: `100%`, maxWidth: minorWidth }}
          >
            {minor}
          </div>
          <div
            className={cn('w-full md:flex-shrink-0', majorClassName)}
            style={{ width: `100%`, maxWidth: majorWidth }}
          >
            {major}
          </div>
        </>
      ) : (
        <>
          <div
            className={cn('w-full md:flex-shrink-0', majorClassName)}
            style={{ width: `100%`, maxWidth: majorWidth }}
          >
            {major}
          </div>
          <div
            className={cn('w-full md:flex-shrink-0', minorClassName)}
            style={{ width: `100%`, maxWidth: minorWidth }}
          >
            {minor}
          </div>
        </>
      )}
    </div>
  );
}
