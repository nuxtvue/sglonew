import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className=" w-full max-w-xs rounded-md  p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="size-40 bg-gray-200"></div>
          <div className="flex-1 space-y-20 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full max-w-sm rounded-md  p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="size-40 bg-gray-200"></div>
          <div className="flex-1 space-y-20 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full max-w-sm rounded-md  p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="size-40 bg-gray-200"></div>
          <div className="flex-1 space-y-20 py-1">
            <div className="h-2 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
