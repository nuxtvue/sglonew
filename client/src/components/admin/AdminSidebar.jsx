import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegNewspaper, FaUsers, FaPencilAlt } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { PiFlagBannerThin } from "react-icons/pi";
const AdminSidebar = () => {
  return (
    <div className="flex flex-col gap-2 h-screen">
      <Link to="/admin" className="text-xl text-center mb-4">
        Меню администратора
      </Link>
      <Link
        to="/admin/create-post"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <FaPencilAlt className="group-hover:text-blue-700 group-hover:text-xl" />
        Создать новость
      </Link>
      <Link
        to="/admin/allusers"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <FaRegNewspaper className="group-hover:text-blue-700 group-hover:text-xl" />
        Пользователи
      </Link>
      <Link
        to="/admin/allblogs"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <FaUsers className="group-hover:text-blue-700 group-hover:text-xl" />
        Все новости
      </Link>
      <Link
        to="/admin/allcomments"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <FaRegComments className="group-hover:text-blue-700 group-hover:text-xl" />
        Все комментарии
      </Link>
      <Link
        to="/admin/banners"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <PiFlagBannerThin className="group-hover:text-blue-700 group-hover:text-xl" />
        Баннеры на главной
      </Link>
    </div>
  );
};

export default AdminSidebar;
