import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import AnimationWrapper from "@/common/page-animation";
import BlogContent from "@/components/blog/BlogContent";
import Comments from "@/components/blog/Comments";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import LikeButton from "@/components/blog/LikeButton";

const BlogPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [images, setImages] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const canonicalUrl = `${window.location.origin}/blog/${params.slug}`;
  const pageTitle = blog.title ? `${blog.title}` : "Загрузка статьи...";
  const pageDescription = blog.description || "Загрузка...";
  const publishDate = blog.createdAt
    ? format(new Date(blog.createdAt), "dd MMMM yyyy", { locale: ru })
    : "";

  useEffect(() => {
    const fetchBlogByUrl = async () => {
      try {
        const res = await axios.get(`/api/blog/getblogbyurl/${params.slug}`);
        if (res.status === 404) {
          navigate("/404", { replace: true });
        }
        if (res.status === 200) {
          console.log(res.data);
          setBlog(res.data);
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
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.log(err);
        navigate("/404", { replace: true });
      }
    };
    fetchBlogByUrl();
  }, [params.slug]);

  // Подготавливаем данные для микроразметки Schema.org
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.description,
    image: images[0]?.original,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Organization",
      name: "Союз женщин Липецкой области",
    },
    publisher: {
      "@type": "Organization",
      name: "Союз женщин Липецкой области",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-72 bg-gray-200 rounded-md mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <AnimationWrapper>
      <main className="container mx-auto px-4 py-8">
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="author" content="СГЛО" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {images[0]?.original && (
          <meta property="og:image" content={images[0].original} />
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {images[0]?.original && (
          <meta name="twitter:image" content={images[0].original} />
        )}

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <time dateTime={blog.createdAt} className="text-gray-600">
                {publishDate}
              </time>
              <LikeButton blogId={blog._id} likesArr={blog.likes} />
            </div>
            <hr className="my-4 border border-gray-100 " />
          </header>

          <div className="prose prose-lg mx-auto mb-8">
            {images[0]?.original && (
              <figure className="mb-8 float-left mr-8 w-[40%]">
                <img
                  src={images[0].original}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full rounded-lg shadow-lg"
                />
                {blog.imageCaption && (
                  <figcaption className="text-center text-gray-600 mt-2 text-sm">
                    {blog.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="content clearfix min-h-[calc(100vh-600px)]">
              {content[0]?.id ? (
                content.map((item, index) => (
                  <section className="mb-6" key={index}>
                    <BlogContent block={item} />
                  </section>
                ))
              ) : (
                <div className="formatted-content">
                  <p dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
              )}
            </div>
          </div>

          {images.length > 1 && (
            <section className="mt-8" aria-label="Галерея изображений">
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showBullets={true}
                showThumbnails={true}
                useBrowserFullscreen={true}
                slideDuration={450}
                swipingTransitionDuration={450}
                slideInterval={4000}
                swipe={true}
                onClick={(e) => {
                  const galleryElement = e.target.closest(".image-gallery");
                  if (galleryElement) {
                    const fullscreenButton = galleryElement.querySelector(
                      ".image-gallery-fullscreen-button"
                    );
                    if (fullscreenButton) {
                      fullscreenButton.click();
                    }
                  }
                }}
                renderItem={(item) => (
                  <div className="image-gallery-image cursor-pointer">
                    <img
                      src={item.original}
                      alt={blog.title}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
              />
            </section>
          )}

          <Comments blogId={blog._id} />
        </article>
      </main>
    </AnimationWrapper>
  );
};

export default BlogPage;
