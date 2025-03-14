import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog/getallblogs", {
          params: {
            page: page,
          },
        });
        if (res.data) setBlogs([...blogs, ...res.data]);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [page]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <h1 className="text-center text-lg font-semibold my-6">Все новости</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          className="my-6 cursor-pointer"
        >
          Показать еще...
        </Button>
      </div>
    </motion.div>
  );
};

export default AllBlogs;
