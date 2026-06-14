import SkeletonGrid from "@/components/skeleton-grid";
import SkeletonSideNav from "@/components/skeleton-sidenav";

function loading() {
  return (
    <div className="mx-auto flex h-full w-full overflow-hidden">
      <SkeletonSideNav />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SkeletonGrid />
      </div>
    </div>
  );
}

export default loading;
