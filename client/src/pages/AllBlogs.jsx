import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/helpers/regions";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("lipetsk");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog/getallblogs", {
          params: {
            page: page,
          },
        });
        if (res.data) setBlogs([...blogs, ...res.data]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [page]);

  const handleRegionChange = (value) => {
    console.log(value);
    setSelectedRegion(value);
    navigate(`/blog/regions/${value}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto px-4"
    >
      <title>Все статьи Союза женщин Липецкой области</title>
      <meta
        name="description"
        content="Все статьи Союза женщин Липецкой области"
      />

      <div className="flex flex-col items-center gap-6 my-8">
        <h1 className="text-2xl font-semibold text-center">Все новости</h1>

        <div className="w-full max-w-md">
          <Select onValueChange={handleRegionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите район" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region.id} value={region.slug}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
