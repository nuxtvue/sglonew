import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen text-center"
    >
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-2xl font-semibold">Страница не найдена</p>
      <p className="mt-2 text-gray-600">
        Извините, запрашиваемая страница не существует.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Вернуться на главную
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
