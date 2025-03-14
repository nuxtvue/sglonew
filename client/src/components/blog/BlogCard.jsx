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

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.url}`} className="">
      <Card className="hover:scale-102 duration-300 transition-all hover:shadow-lg">
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
      </Card>
    </Link>
  );
};

export default BlogCard;
