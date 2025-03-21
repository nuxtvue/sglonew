import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { FaVk } from "react-icons/fa6";
import { FaOdnoklassnikiSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import RatingRegions from "./RatingRegions";
import CategoryList from "./CategoryList";

const LeftColumn = () => {
  return (
    <div className="space-y-4">
      {/* Председатель */}
      <div className="flex flex-col items-center">
        <div className="marck-script-regular text-blue-500 text-2xl">
          Председатель
        </div>
        <img
          src="/mainimages/viprofile.jpg"
          alt=""
          width={230}
          className="rounded-md"
          loading="lazy"
        />
        <div className="text-center text-lg text-blue-700 mt-2">
          Урываева Вера Ивановна
        </div>
      </div>
      <Separator className="w-full h-[1px] bg-gray-200" />
      {/* QR КОД */}
      <div className="text-center flex flex-col items-center">
        <div className="marck-script-regular text-blue-500 text-2xl ">
          QR-код
        </div>
        <span className="whitespace-pre-wrap">
          QR-код расчетного счета нашей организации. Для перевода средств на
          благотворительную деятельность, сканируйте QR-код из приложения банка
          и переведите возможную для Вас сумму.
        </span>
        <img src="/mainimages/qr.jpg" alt="" width={200} loading="lazy" />
      </div>
      <Separator className="w-full h-[1px] bg-gray-200" />
      {/* Контакты */}
      <div>
        <div className="marck-script-regular text-blue-500 text-2xl text-center">
          Контакты
        </div>
        <div className="space-y-2">
          <a
            className="text-blue-800 flex items-center"
            href="tel:+74742281221"
          >
            <MdOutlinePhone className="text-xl" />
            &nbsp; +7 (4742) 28-12-21
          </a>
          <a
            href="mailto:sglo48@mail.ru"
            className="flex items-center text-blue-800"
          >
            <MdOutlineEmail className="text-xl" />
            &nbsp; sglo48@mail.ru
          </a>
          <div className="flex justify-start">
            <FaVk className="text-3xl hover:text-blue-600 text-gray-700" />
            <FaOdnoklassnikiSquare className="text-3xl hover:text-orange-600 text-gray-700" />
          </div>
        </div>
      </div>
      <Separator className="w-full h-[1px] bg-gray-200" />
      <RatingRegions />
      <Separator className="w-full h-[1px] bg-gray-200" />
      <CategoryList />
    </div>
  );
};

export default LeftColumn;
