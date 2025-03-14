import MapReg from "@/components/blog/MapReg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [bannerBlogs, setBannerBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogsBanner = async () => {
      try {
        const response = await axios.get("/api/blog/banner");

        if (response.data) setBannerBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogsBanner();
  }, []);
  return (
    <div>
      <div className="mx-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="h-[350px] shadow-xl">
            {bannerBlogs.map((blog) => (
              <CarouselItem key={blog._id} className="relative">
                <Link to={`/blog/${blog.url}`}>
                  <img
                    src={blog.coverImageName[0].path}
                    className="object-cover h-full w-full rounded-md"
                    loading="lazy"
                    alt={blog.title}
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
      </div>
      <div className="mt-4">
        <h1 className="text-center text-xl">Карта районов</h1>
        <MapReg />
      </div>
    </div>
  );
};

export default HomePage;
