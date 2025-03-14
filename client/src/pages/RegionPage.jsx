import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/common/page-animation";
import { motion } from "framer-motion";

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
  if (params.slug == "lebedyan") region = "Лебедянский район";
  if (params.slug == "dobroe") region = "Добровский район";
  if (params.slug == "izmalkovo") region = "Измалковский район";
  if (params.slug == "eletsky") region = "Елецкий район";
  if (params.slug == "elets") region = "г. Елец";
  if (params.slug == "zadonsk") region = "Задонский район";
  if (params.slug == "lipetsk-region") region = "Липецкий район";
  if (params.slug == "gryazi") region = "Грязинский район";
  if (params.slug == "dolgorukovo") region = "Долгоруковский район";
  if (params.slug == "volovo") region = "Воловский район";
  if (params.slug == "terbuni") region = "Тербунский район";
  if (params.slug == "hlevnoe") region = "Хлевенский район";
  if (params.slug == "usman") region = "Усманский район";
  if (params.slug == "dobrinka") region = "Добринский район";

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
    <AnimationWrapper>
      <div>
        <h1 className="text-center text-lg font-semibold mb-8">{region}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <motion.div
            initial={{ opacity: 0, y: index * 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={blog._id}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        {blogs.length == 0 && <p>Ничего не найдено</p>}
        {blogs.length >= 9 && (
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            className="my-6 cursor-pointer"
          >
            Показать еще...
          </Button>
        )}
      </div>
    </AnimationWrapper>
  );
};

export default RegionPage;
