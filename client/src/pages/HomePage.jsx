import MapReg from "@/components/blog/MapReg";

import axios from "axios";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogCard from "@/components/blog/BlogCard";
const CarouselMain = React.lazy(() =>
  import("../components/blog/CarouselMain")
);
const HomePage = () => {
  const [lastBlogs, setLastBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog/getallblogs");
        if (res.data) setLastBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <title>Союз женщин Липецкой области - официальный сайт</title>
      <meta
        name="description"
        content="Союз женщин Липецкой области - официальный сайт"
      />
      <CarouselMain />
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-center text-xl">Карта районов</h1>
        <MapReg />
      </motion.div>
      <div>
        <h2 className="text-center text-xl my-4">Последние новости</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lastBlogs.map(
            (blog, index) =>
              index < 6 && <BlogCard key={blog._id} blog={blog} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
