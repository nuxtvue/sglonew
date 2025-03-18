import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import AnimationWrapper from "@/common/page-animation";
import BlogContent from "@/components/blog/BlogContent";

const BlogPage = () => {
  const params = useParams();
  console.log(params);
  const [blog, setBlog] = useState({});
  const [images, setImages] = useState([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchBlogByUrl = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogbyurl/${params.slug}`);
        if (res.status === 200) {
          setBlog(res.data);
          console.log(res.data.content[0]);
          setContent(res.data.content);
          let imgs = [];
          res.data.coverImageName.forEach((element) => {
            imgs.push({
              original: "/" + element.path,
              thumbnail: "/" + element.path,
              thumbnailHeight: "100px",
              thumbnailLoading: "lazy",
            });
          });

          setImages(imgs);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogByUrl();
  }, [params.slug]);
  return (
    <AnimationWrapper>
      <div>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        <h1 className="text-lg font-semibold text-center my-4">{blog.title}</h1>
        <article className="mb-8">
          <img
            src={images[0]?.original}
            loading="lazy"
            className="w-1/3 float-left mr-4 rounded-md h-72 object-cover"
          />
          <div className="min-h-[calc(100vh-400px)]">
            {content[0]?.id ? (
              content.map((item, index) => (
                <div
                  className="px-[50px] md:px-[30px] sm:px-[20px] lg:px-[50px] "
                  key={index}
                >
                  <BlogContent
                    block={item}
                    className="flex items-center justify-center "
                  />
                </div>
              ))
            ) : (
              <div className="px-[50px] md:px-[30px] sm:px-[20px] lg:px-[50px] ">
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
              </div>
            )}
          </div>
        </article>
        <ImageGallery items={images} />;
      </div>
    </AnimationWrapper>
  );
};

export default BlogPage;
