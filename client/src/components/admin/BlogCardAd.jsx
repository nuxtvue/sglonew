import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Link } from "react-router-dom";
import DateComponent from "@/helpers/DateHelper";
import { FaRegEye } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";

const BlogCardAd = ({ blog }) => {
  const deleteBlog = async (e, id) => {
    e.preventDefault();
    try {
      let pr = window.confirm("Вы действительно хотите удалить этот пост?");
      if (!pr) return;
      const res = await axios.delete(`/api/blog/deleteblog/${id}`, {
        withCredentials: true,
      });
      if (res.data) toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="hover:scale-102 duration-300 transition-all hover:shadow-lg relative">
      <FaRegTrashAlt
        className="absolute right-4 top-4 text-red-500"
        onClick={(e) => deleteBlog(e, blog._id)}
      />
      <Link to={`/admin/edit/${blog.url}`} className="">
        <CardHeader>
          <CardTitle className="h-[50px] line-clamp-3">{blog.title}</CardTitle>
          <hr className="w-64 mx-auto text-center border border-gray-100 h-0.5" />
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={"/" + blog.coverImageName[0].path}
            className="object-cover h-48 w-full rounded-md"
            loading="lazy"
            alt={blog.title}
          />
        </CardContent>
        <hr className="w-64 mx-auto text-center border border-gray-100 h-0.5" />

        <div className="flex flex-row justify-between items-center mx-4">
          <div className="text-gray-500 text-sm">
            <DateComponent date={blog.createdDate} />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaRegEye className="" />
            {blog.views}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BlogCardAd;
