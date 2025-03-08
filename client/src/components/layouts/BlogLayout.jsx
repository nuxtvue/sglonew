import React from "react";
import BlogHeader from "../blog/BlogHeader";
import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      {/* Header */}
      <div className="">
        <BlogHeader />
      </div>

      {/* Outlet */}
      <div className="bg-[url('./assets/imgs/back.png')] gap-2 flex-wrap-reverse flex p-8 md:px-28 md:py-4  h-screen bg-gray-100 ">
        <div className="bg-white rounded-lg md:min-w-[24%] min-w-[100%] p-4 shadow-lg">
          leftmenu
        </div>
        <div className="bg-white rounded-lg p-4 shadow-lg md:min-w-[74%] min-w-[100%]">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default BlogLayout;
