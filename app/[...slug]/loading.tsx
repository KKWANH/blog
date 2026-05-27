import { Aurora } from '@/components/aurora'

/**
 * Skeleton shown during client-side navigation to any /[...slug] route.
 * Mirrors the rough layout: back-link → hero (eyebrow + title + meta) →
 * two content panels, so the layout shift on hydration is minimal.
 */
export default function ContentLoading() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Aurora />

      {/* Header placeholder — matches the sticky header height */}
      <div className="sticky top-0 z-40 h-14 w-full border-b border-border/50 bg-background/70 backdrop-blur-md" />

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 md:px-8">
        {/* Back link */}
        <div className="mt-8 md:mt-10">
          <div className="skeleton-shimmer h-4 w-28 rounded-md" />
        </div>

        {/* Hero */}
        <div className="mt-8 md:mt-10 space-y-4">
          <div className="skeleton-shimmer h-3 w-20 rounded-md" />
          <div className="skeleton-shimmer h-12 w-full max-w-2xl rounded-md" />
          <div className="skeleton-shimmer h-5 w-full max-w-xl rounded-md" />
          <div className="skeleton-shimmer h-5 w-2/3 max-w-lg rounded-md" />
          {/* Meta row */}
          <div className="flex gap-4 pt-2">
            <div className="skeleton-shimmer h-3.5 w-24 rounded-md" />
            <div className="skeleton-shimmer h-3.5 w-20 rounded-md" />
          </div>
        </div>

        {/* Content panels */}
        <div className="mt-16 md:mt-20 space-y-5">
          <div className="skeleton-shimmer h-56 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="skeleton-shimmer h-40 w-full rounded-2xl" />
            <div className="skeleton-shimmer h-40 w-full rounded-2xl" />
          </div>
          <div className="skeleton-shimmer h-48 w-full rounded-2xl" />
        </div>
      </main>
    </div>
  )
}
