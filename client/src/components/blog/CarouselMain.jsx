import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { Link } from "react-router-dom";
const OptimizedImage = React.memo(({ src, alt, className }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="eager" // Изменили на eager для первоочередной загрузки
    decoding="async"
    width={1200} // Явное указание размеров
    height={350}
  />
));
const CarouselMain = () => {
  const [loading, setLoading] = useState(true);
  const [bannerBlogs, setBannerBlogs] = useState([]);
  const [error, setError] = useState(null);
  const fetchBlogsBanner = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog/banner");

      if (response.data?.length) setBannerBlogs(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.error(error);
      setLoading(false);
    }
  });
  useEffect(() => {
    const abortController = new AbortController();

    fetchBlogsBanner();
    return () => abortController.abort();
  }, []);
  if (loading || !bannerBlogs.length) return null;
  if (error) return null; // Скрываем карусель при ошибке
  return (
    <div>
      <motion.div
        className="mx-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          options={{
            loop: true,
            dragFree: true,
          }}
        >
          <CarouselContent className="h-[350px] shadow-xl">
            {bannerBlogs.map((blog) => (
              <CarouselItem key={blog._id} className="relative">
                <Link to={`/blog/${blog.url}`}>
                  <OptimizedImage
                    src={blog.coverImageName[0].path}
                    alt={blog.title}
                    className="object-cover h-full w-full rounded-md"
                  />
                </Link>
                <p className="absolute  bottom-10 mx-4 transform  text-white p-2 text-lg font-semibold bg-blue-500/80 z-50 rounded-md">
                  {blog.title}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default React.memo(CarouselMain);
