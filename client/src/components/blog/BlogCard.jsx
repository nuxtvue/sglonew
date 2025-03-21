import React from "react";
import { BsGeoAlt } from "react-icons/bs";
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
import { IoPricetagOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.url}`} className="relative">
      <Card className="hover:scale-102 duration-300 transition-all hover:shadow-lg">
        <CardHeader className="px-2">
          <CardTitle className="h-[58px] line-clamp-3 pt-2 text-center">
            {blog.title}
          </CardTitle>

          <span className="text-gray-500 text-sm absolute left-2 top-1 flex items-center gap-1">
            <IoPricetagOutline />
            {blog.tag}
          </span>
          <hr className="w-64 mx-auto text-center border border-gray-100 h-0.5" />
          <CardDescription>
            <span className="text-gray-500 text-sm flex gap-1">
              <BsGeoAlt />
              {blog.region}
            </span>
          </CardDescription>
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

          <div className="flex items-center gap-2 text-gray-500 text-sm justify-center">
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <FaRegComment />
              {blog.comments.length}
            </div>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <FaRegHeart />
              {blog.likes.length}
            </div>
            <span className="flex items-center gap-1">
              <FaRegEye className="" />
              {blog.views}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default React.memo(BlogCard);
