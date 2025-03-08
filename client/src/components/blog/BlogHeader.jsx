import React from "react";

const BlogHeader = () => {
  return (
    <div className="px-[60px] gap-4 flex flex-wrap sm:gap-6 justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500 mx-6 mt-2 rounded-lg text-xl shadow-lg py-4">
      <div>Logo</div>
      <div className="flex gap-4">
        <div>Войти</div>
        <div>Регистрация</div>
      </div>
    </div>
  );
};

export default BlogHeader;
