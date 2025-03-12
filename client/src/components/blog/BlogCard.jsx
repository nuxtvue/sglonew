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

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.url}`}
      className="hover:scale-102 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-500/50"
    >
      <Card>
        <CardHeader>
          <CardTitle className="h-[50px] line-clamp-3">{blog.title}</CardTitle>
          <hr className="w-64 mx-auto text-center border border-gray-100 h-0.5" />
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={"/" + blog.coverImageName[0].path}
            className="object-cover h-48 w-full"
            loading="lazy"
            alt={blog.title}
          />
        </CardContent>
        <CardFooter>
          <p></p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
