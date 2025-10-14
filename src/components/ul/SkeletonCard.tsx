

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white  p-4 animate-pulse">
      {/* Image skeleton */}
      <div className="h-[301px] bg-orange-200  rounded-xl mb-4"></div>

      {/* Title skeleton */}
      <div className="h-10 bg-orange-200 rounded w-3/4 mb-3"></div>

      {/* Subtitle skeleton */}
      <div className="h-9 bg-orange-200  rounded w-1/2 mb-3"></div>

      {/* Bottom row skeletons */}
      <div className="flex justify-between gap-2">
        <div className="h-4 bg-orange-200  rounded w-1/3"></div>
        <div className="h-4 bg-orange-200  rounded w-1/4"></div>
      </div>
    </div>
  );
}