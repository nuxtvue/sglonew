import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaVk, FaOdnoklassnikiSquare } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const famousQuotes = [
  {
    text: "Самое главное в жизни — это не то, что с тобой происходит, а то, как ты к этому относишься.",
    author: "Мария Склодовская-Кюри",
    role: "Учёный-физик, химик",
  },
  {
    text: "Не бойтесь быть сильными. Сила — это не то, что приходит от физической способности. Она приходит от несгибаемой воли.",
    author: "Индира Ганди",
    role: "Политический деятель",
  },
  {
    text: "Я не боюсь штормов, потому что учусь управлять своим кораблем.",
    author: "Луиза Мэй Олкотт",
    role: "Писательница",
  },
  {
    text: "Величайшая слава в жизни заключается не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз, когда мы падаем.",
    author: "Нельсон Мандела",
    role: "Политический деятель",
  },
  {
    text: "Я не хочу быть женщиной, которая живёт в тени мужчины. Я хочу быть той, кто стоит рядом с ним.",
    author: "Анна Павлова",
    role: "Балерина",
  },
  {
    text: "Не позволяйте никому говорить вам, что вы не можете что-то сделать.",
    author: "Хелен Келлер",
    role: "Писательница, активистка",
  },

  {
    text: "В жизни нет ничего невозможного, если у вас есть мужество и настойчивость.",
    author: "Мария Тереза",
    role: "Политический деятель",
  },
  {
    text: "Сила женщины не в том, чтобы быть как мужчина, а в том, чтобы быть собой.",
    author: "Маргарет Тэтчер",
    role: "Политический деятель",
  },
  {
    text: "Нельзя быть настоящим математиком, не будучи немного поэтом",
    author: "Софья Ковалевская (1850–1891)",
    role: "Выдающийся математик, первая женщина-профессор в Европе.",
  },
  {
    text: "Женщина — это не просто человек, она — целый мир, полный чувств, мыслей и забот.",
    author: "Лев Толстой",
    role: "Выдающийся писатель",
  },
  {
    text: "Женщина создана для любви, но её сила заключается в том, что она умеет любить без слабости.",
    author: "Марина Цветаева",
    role: "Выдающийся поэт",
  },
];

const Footer = () => {
  const [currentQuote, setCurrentQuote] = useState(famousQuotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * famousQuotes.length);
      setCurrentQuote(famousQuotes[randomIndex]);
    }, 7000); // Меняем цитату каждые 10 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-blue-900/70 text-white rounded-md">
      <div className="container mx-auto px-4 py-4 flex justify-start flex-wrap  relative">
        <div className="flex flex-col items-center gap-4 md:w-1/2 w-full">
          <h3 className="font-semibold">Наши соцсети:</h3>
          <div className="flex gap-4">
            <FaVk className="text-3xl hover:text-blue-600 text-gray-700" />
            <FaOdnoklassnikiSquare className="text-3xl hover:text-orange-600 text-gray-700" />
          </div>
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            className="w-full md:w-1/2 hidden md:block  md:min-w-1/2 absolute top-4 right-0"
            key={currentQuote.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 1 }}
          >
            <p className="italic mb-2">"{currentQuote.text}"</p>
            <p className="font-semibold">
              <span className="underline">{currentQuote.author}</span> -{" "}
              {currentQuote.role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <hr className="border-t border-gray-400/70 w-1/2 mb-2 mx-auto" />
      <div className="md:w-1/3 md:min-w-1/3 w-full md:text-right text-center mx-auto mb-2">
        &copy;{new Date().getFullYear()} - Союз Женщин Липецкой области
      </div>
    </footer>
  );
};

export default Footer;
