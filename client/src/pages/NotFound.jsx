import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  text-black">
      {/* Анимированный заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600"
      >
        404
      </motion.h1>

      {/* Подзаголовок */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 text-2xl font-medium text-gray-900"
      >
        Страница не найдена
      </motion.p>

      {/* Описание */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-2 text-sm text-gray-800"
      >
        Кажется, вы заблудились. Давайте вернемся на главную страницу.
      </motion.p>

      {/* Кнопка возврата на главную */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Вернуться на главную
        </Link>
      </motion.div>

      {/* Декоративные элементы */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-blue-500 to-transparent"
      ></motion.div>
    </div>
  );
};

export default NotFoundPage;
