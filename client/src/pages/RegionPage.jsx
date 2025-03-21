import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CiCalendar } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaSpinner } from "react-icons/fa";
import SkeletonLoader from "@/components/blog/SkeletonLoader";
import Pagination from "@/components/ui/Pagination";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 12;

const RegionPage = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [blogs, setBlogs] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isOpen, setIsOpen] = useState(false);

  let region;
  let sklonRegion;
  if (params.slug == "dankov")
    (region = "Данковский район"), (sklonRegion = "Данковского района");
  if (params.slug == "lev-tolstoy")
    (region = "Лев-Толстовский район"),
      (sklonRegion = "Лев-Толстовского района");
  if (params.slug == "lipetsk")
    (region = "г. Липецк"), (sklonRegion = "города Липецка");
  if (params.slug == "chapligin")
    (region = "Чаплыгинский район"), (sklonRegion = "Чаплыгинского района");
  if (params.slug == "stanovoe")
    (region = "Становлянский район"), (sklonRegion = "Становлянского района");
  if (params.slug == "krasnoe")
    (region = "Краснинский район"), (sklonRegion = "Краснинского района");
  if (params.slug == "lebedyan")
    (region = "Лебедянский район"), (sklonRegion = "Лебедянского района");
  if (params.slug == "dobroe")
    (region = "Добровский район"), (sklonRegion = "Добровского района");
  if (params.slug == "izmalkovo")
    (region = "Измалковский район"), (sklonRegion = "Измалковского района");
  if (params.slug == "eletsky")
    (region = "Елецкий район"), (sklonRegion = "Елецкого района");
  if (params.slug == "elets")
    (region = "г. Елец"), (sklonRegion = "города Елец");
  if (params.slug == "zadonsk")
    (region = "Задонский район"), (sklonRegion = "Задонского района");
  if (params.slug == "lipetsk-region")
    (region = "Липецкий район"), (sklonRegion = "Липецкого района");
  if (params.slug == "gryazi")
    (region = "Грязинский район"), (sklonRegion = "Грязинского района");
  if (params.slug == "dolgorukovo")
    (region = "Долгоруковский район"), (sklonRegion = "Долгоруковского района");
  if (params.slug == "volovo")
    (region = "Воловский район"), (sklonRegion = "Воловского района");
  if (params.slug == "terbuni")
    (region = "Тербунский район"), (sklonRegion = "Тербунского района");
  if (params.slug == "hlevnoe")
    (region = "Хлевенский район"), (sklonRegion = "Хлевенского района");
  if (params.slug == "usman")
    (region = "Усманский район"), (sklonRegion = "Усманского района");
  if (params.slug == "dobrinka")
    (region = "Добринский район"), (sklonRegion = "Добринского района");

  const fetchBlogsByRegion = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/blog/getblogsbyregion/${region}`, {
        params: {
          page: currentPage,
          limit: POSTS_PER_PAGE,
          startDate: startDate ? startDate : "",
          endDate: endDate ? endDate : "",
        },
      });
      console.log(res.data);

      const { posts, total } = res.data;
      setBlogs(posts);
      setTotalPosts(total);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error);
      setBlogs([]);
      setTotalPosts(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsByRegion();
  }, [currentPage, params.slug, startDate, endDate]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    setSearchParams({ page: "1" });
    fetchBlogsByRegion();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="container mx-auto px-4 py-8"
    >
      <title>{"Новости Союза женщин " + sklonRegion}</title>
      <meta
        name="description"
        content={`Читать новости и статьи о событиях в ${region}. Всего статей: ${totalPosts}`}
      />
      <meta name="author" content="Союз женщин Липецкой области" />
      <meta name="robots" content="index, follow" />
      <link
        rel="canonical"
        href={`${window.location.origin}/blog/regions/${params.slug}`}
      />

      <meta
        property="og:title"
        content={`Новости Союза женщин ${sklonRegion}`}
      />
      <meta
        property="og:description"
        content={`Читать новости и статьи о событиях в ${region}. Всего статей: ${totalPosts}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${window.location.origin}/region/${params.slug}`}
      />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={`Новости Союза женщин ${sklonRegion}`}
      />
      <meta
        name="twitter:description"
        content={`Читать новости и статьи о событиях в ${region}. Всего статей: ${totalPosts}`}
      />

      <div className="text-center relative mb-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          {region}
        </h1>
        <span className="absolute top-1 right-1">
          {"Всего статей: " + totalPosts}
        </span>

        <div className="my-4 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {"От "}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CiCalendar className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP", { locale: ru })
                  ) : (
                    <span>Выбор начальной даты</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            {"До"}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CiCalendar className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP", { locale: ru })
                  ) : (
                    <span>Выбор конечной даты</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  locale={ru}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleSearch} disabled={loading}>
            {loading && <FaSpinner className="animate-spin mr-2" />}
            Найти
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">Ничего не найдено</div>
      ) : (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </motion.div>
  );
};

export default RegionPage;
