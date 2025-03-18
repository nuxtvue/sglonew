import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
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
        <IoCreateOutline className="group-hover:text-blue-700 group-hover:text-xl" />
        Создать новость
      </Link>
      <Link
        to="/admin/allblogs"
        className="flex items-center gap-2 text-lg hover:bg-blue-100/50 py-2 px-4 rounded-lg cursor-pointer hover:ml-2 transition-all duration-300 group hover:font-semibold"
      >
        <FaRegNewspaper className="group-hover:text-blue-700 group-hover:text-xl" />
        Все новости
      </Link>
    </div>
  );
};

export default AdminSidebar;
