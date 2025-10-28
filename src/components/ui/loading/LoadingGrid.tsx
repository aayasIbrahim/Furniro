import React from "react";
import SkeletonCard from "./SkeletonCard";

export default function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
