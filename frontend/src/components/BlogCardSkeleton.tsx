export const BlogCardSkeleton = () => {
  return (
    <div className="mt-10 w-1/2 border-b pb-10">
      <div role="status" className="animate-pulse mb-3">
        <div className="h-6 bg-stone-200 rounded-full w-1/5"></div>
      </div>
      <div role="status" className="animate-pulse mb-1">
        <div className="h-3 bg-stone-200 rounded-full w-full"></div>
      </div>
      <div role="status" className="animate-pulse mb-1">
        <div className="h-3 bg-stone-200 rounded-full w-1/2"></div>
      </div>
      <div role="status" className="animate-pulse mb-1">
        <div className="h-3 bg-stone-200 rounded-full w-1/3"></div>
      </div>
      <div role="status" className="animate-pulse mb-6">
        <div className="h-3 bg-stone-200 rounded-full w-3/4"></div>
      </div>
      <div role="status" className=" animate-pulse">
        <div className="h-2.5 bg-stone-200 rounded-full w-1/5"></div>
      </div>
    </div>
  );
};
