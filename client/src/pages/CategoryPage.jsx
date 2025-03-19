import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { categories } from "@/helpers/categories";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/ui/Pagination";

const POSTS_PER_PAGE = 12;

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);

  // Получаем информацию о категории из slug
  const category = categories.find((cat) => cat.slug === slug);
  const categoryName = category ? category.name : "Категория не найдена";
  const categoryDescription =
    category?.description || `Статьи и публикации в категории ${categoryName}`;
  const pageTitle = `${categoryName} - Новости и статьи`;
  const canonicalUrl = `${window.location.origin}/category/${slug}${
    currentPage > 1 ? `?page=${currentPage}` : ""
  }`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `/api/blog/getblogsbycategory/${categoryName}`,
          {
            params: {
              page: currentPage,
              limit: POSTS_PER_PAGE,
            },
          }
        );
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          setTotalPosts(response.data.length);
        } else if (response.data.posts) {
          setPosts(response.data.posts);
          setTotalPosts(response.data.total || response.data.posts.length);
        } else {
          setPosts([]);
          setTotalPosts(0);
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
        setPosts([]);
        setTotalPosts(0);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryName, currentPage]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <title>{pageTitle}</title>
        <meta name="description" content={categoryDescription} />
        <div className="animate-pulse space-y-4">
          {[...Array(POSTS_PER_PAGE)].map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </main>
    );
  }

  // Подготавливаем данные для микроразметки Schema.org
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: categoryDescription,
    numberOfItems: totalPosts,
    url: canonicalUrl,
    hasPart: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      description: post.description || post.title,
      url: `${window.location.origin}/blog/${post.slug}`,
      datePublished: post.createdAt,
      author: {
        "@type": "Organization",
        name: "Союз женщин Липецкой области",
      },
    })),
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <title>{pageTitle}</title>
      <meta name="description" content={categoryDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={categoryDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      {currentPage > 1 && <meta name="robots" content="noindex, follow" />}

      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {categoryName}
        </h1>
        <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
          {categoryDescription}
        </p>
      </header>

      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(posts) &&
            posts.map((post) => <BlogCard key={post._id} blog={post} />)}
        </div>

        {!Array.isArray(posts) || posts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            В данной категории пока нет публикаций
          </div>
        ) : (
          <nav className="mt-8" aria-label="Навигация по страницам">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </nav>
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
