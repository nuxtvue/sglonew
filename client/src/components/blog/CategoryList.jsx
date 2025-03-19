import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { categories as categoryList } from "@/helpers/categories";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSlugByName = (name) => {
    const category = categoryList.find((cat) => cat.name === name);
    return category ? category.slug : "";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/blog/countbycategory");
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-8 bg-gray-200 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="marck-script-regular text-blue-500 text-2xl text-center">
        Категории
      </h3>
      <div className="space-y-2">
        {categories.map(
          (category) =>
            category._id && (
              <Link
                key={category._id}
                to={`/category/${getSlugByName(category._id)}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {category._id}
                </span>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                  {category.count}
                </span>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default CategoryList;
