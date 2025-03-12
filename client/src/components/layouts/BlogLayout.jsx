import React from "react";
import BlogHeader from "../blog/BlogHeader";
import { Outlet } from "react-router-dom";
import LeftColumn from "../blog/LeftColumn";
import AnimationWrapper from "../../common/page-animation";
import { Toaster } from "@/components/ui/sonner";

const BlogLayout = () => {
  return (
    <AnimationWrapper>
      <div className=" min-h-screen flex flex-col mx-auto  justify-center bg-[url('/mainimages/cropped-orig-min.png')] bg-repeat-y">
        {/* Header */}
        <div className="mx-4">
          <BlogHeader />
        </div>

        {/* Outlet */}
        <div className="">
          <div className="bg-transparent text-center text-3xl marck-script-regular mt-2 text-blue-700/70">
            Наша сила - в единстве. Наше богатство - в многообразии!
          </div>
          <div className=" gap-2 flex-wrap-reverse flex p-8 md:px-18 md:py-4">
            <div className="bg-white rounded-lg md:min-w-[24%] min-w-[100%] md:max-w-[24%] p-4 shadow-lg">
              <LeftColumn />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg md:min-w-[74%] min-w-[100%] md:max-w-[74%]">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Toaster />
      </div>
    </AnimationWrapper>
  );
};

export default BlogLayout;
