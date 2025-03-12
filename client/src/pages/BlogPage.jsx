import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

const BlogPage = () => {
  const params = useParams();
  console.log(params);
  const [blog, setBlog] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBlogByUrl = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogbyurl/${params.slug}`);
        if (res.status === 200) {
          setBlog(res.data);
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
    <div>
      <h1 className="text-lg font-semibold text-center my-4">{blog.title}</h1>
      <article>
        <img
          src={images[0]?.original}
          loading="lazy"
          className="w-[40%] float-left mr-4 rounded-md"
        />
        <p
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="ml-4 indent-4 min-h-screen"
        ></p>
      </article>
      <ImageGallery items={images} />;
    </div>
  );
};

export default BlogPage;
