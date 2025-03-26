import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BannerBageAd = () => {
  const [blogsBanner, setBlogsBanner] = useState([]);

  useEffect(() => {
    const fetchBlogsWithBanner = async () => {
      try {
        const response = await axios.get("/api/blog/banner");
        if (response.data) {
          console.log(response.data);
          setBlogsBanner(response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении постов:", error);
      }
    };
    fetchBlogsWithBanner();
  }, []);
  const handleChangeBanner = async (e, id) => {
    try {
      const res = await axios.post(
        "/api/blog/edit",
        {
          id,
          banner: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        // Обновляем состояние после успешного запроса
        setBlogsBanner((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Ошибка при обновлении баннера:", err);
    }
  };
  return (
    <div>
      <h1>Посты на баннере</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {blogsBanner.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center justify-start flex-col gap-4"
          >
            <h2>{blog.title}</h2>
            <img
              className="w-20 h-20 rounded-full"
              src={"/" + blog.coverImageName[0].path}
              alt={blog.title}
            />
            <Checkbox
              defaultChecked={blog.banner}
              onCheckedChange={(e) => handleChangeBanner(e, blog._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerBageAd;
