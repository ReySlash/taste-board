import { SkeletonCard } from "./skeleton-card";

function SkeletonGrid() {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-2">
      {skeletonArray.map((item) => (
        <div key={item} className="col-span-1">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;
