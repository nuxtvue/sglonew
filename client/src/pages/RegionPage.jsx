import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";

const RegionPage = () => {
  const params = useParams();
  console.log(params);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  let region;
  if (params.slug == "dankov") region = "Данковский район";
  if (params.slug == "lev-tolstoy") region = "Лев-Толстовский район";
  if (params.slug == "lipetsk") region = "г. Липецк";
  if (params.slug == "chapligin") region = "Чаплыгинский район";
  if (params.slug == "stanovoe") region = "Становлянский район";
  if (params.slug == "krasnoe") region = "Краснинский район";

  useEffect(() => {
    const fetchBlogsByRegion = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogsbyregion/${region}`, {
          params: {
            page: page,
          },
        });
        setBlogs([...blogs, ...res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogsByRegion();
  }, [params.slug, region, page]);
  return (
    <div>
      <h1 className="text-center text-lg font-semibold mb-8">{region}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="text-center">
        {" "}
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          className="my-6 cursor-pointer"
        >
          Показать еще...
        </Button>
      </div>
    </div>
  );
};

export default RegionPage;
