import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <div class=" w-full max-w-xs rounded-md  p-4">
        <div class="flex animate-pulse space-x-4">
          <div class="size-40 bg-gray-200"></div>
          <div class="flex-1 space-y-20 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-1 gap-4">
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div class=" w-full max-w-sm rounded-md  p-4">
        <div class="flex animate-pulse space-x-4">
          <div class="size-40 bg-gray-200"></div>
          <div class="flex-1 space-y-20 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-1 gap-4">
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div class=" w-full max-w-sm rounded-md  p-4">
        <div class="flex animate-pulse space-x-4">
          <div class="size-40 bg-gray-200"></div>
          <div class="flex-1 space-y-20 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-1 gap-4">
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div class="h-2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
