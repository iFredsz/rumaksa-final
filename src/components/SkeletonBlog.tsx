const SkeletonBlog = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="skeleton-shine h-6 w-3/4 rounded-md"></div>
      <div className="skeleton-shine h-40 w-full rounded-md"></div>
      <div className="space-y-2">
        <div className="skeleton-shine h-4 w-full rounded-md"></div>
        <div className="skeleton-shine h-4 w-5/6 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonBlog;
