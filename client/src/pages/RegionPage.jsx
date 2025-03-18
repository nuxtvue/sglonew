import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/common/page-animation";
import { motion } from "framer-motion";
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

const RegionPage = () => {
  const params = useParams();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
          page: page,
          startDate: startDate ? startDate : "",
          endDate: endDate ? endDate : "",
        },
      });
      if (page === 1) {
        setBlogs([]);
      }

      setBlogs((prevBlogs) => [...prevBlogs, ...res.data.blogs]);
      setCount(res.data.countBlogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogsByRegion();
  }, [page, params.slug]);

  return (
    <AnimationWrapper>
      <title>{"Новости Союза женщин " + sklonRegion}</title>
      <div className="text-center relative">
        <h1 className="text-center text-lg font-semibold mb-8">{region}</h1>
        <span className="absolute top-1 right-1">
          {"Всего статей: " + count}
        </span>
        {loading && <SkeletonLoader />}
        <div className="my-4  top-1 left-1 flex items-center flex-row">
          {"От "}
          &nbsp;
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
            <PopoverContent className="w-auto p-0 absolute">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          &nbsp;
          {" До "}
          &nbsp;
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
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
            <PopoverContent className="w-auto p-0 absolute">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => {
              setPage(1);
              fetchBlogsByRegion();
            }}
            classname={loading ? "disabled" : ""}
          >
            {loading && <FaSpinner className="animate-spin mr-2" />}
            Найти
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog, index) => (
          <motion.div
            initial={{ opacity: 0, y: index * 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            key={blog._id}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
      <div className="text-center">
        {blogs.length == 0 && <p>Ничего не найдено</p>}
        {blogs.length >= 9 && blogs.length < count && (
          <Button
            disabled={blogs.length >= count}
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
