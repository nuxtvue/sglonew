import { Separator } from "@radix-ui/react-separator";
import React from "react";
import { FaVk } from "react-icons/fa6";
import { FaOdnoklassnikiSquare } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";

const LeftColumn = () => {
  return (
    <div className="">
      {/* Председатель */}
      <div className="flex items-center flex-col">
        <div className="marck-script-regular text-blue-500 text-2xl">
          Председатель
        </div>
        <img
          src="/mainimages/viprofile.jpg"
          alt=""
          width={230}
          className="rounded-md"
        />
        <div>Урываева Вера Ивановна</div>
      </div>
      <Separator className="w-full h-[1px] bg-gray-200 my-2" />
      {/* QR КОД */}
      <div className="text-center flex items-center flex-col">
        <div className="marck-script-regular text-blue-500 text-2xl ">
          QR-код
        </div>
        <span className="text-wrap whitespace-pre-wrap">
          QR-код расчетного счета нашей организации. Для перевода средств на
          благотворительную деятельность, сканируйте QR-код из приложения банка
          и переведите возможную для Вас сумму. Мы Вам очень благодарны.
        </span>
        <img src="/mainimages/qr.jpg" alt="" width={200} />
      </div>

      {/* Контакты */}
      <Separator className="w-full h-[1px] bg-gray-200 my-2" />
      <div>
        <div className="marck-script-regular text-blue-500 text-2xl text-center">
          Контакты
        </div>
        <a className="text-blue-800  flex items-center" href="tel:+74742281221">
          <MdOutlinePhone className="text-xl" />
          &nbsp; +7 (4742) 28-12-21
        </a>
        <a
          href="mailto:sglo48@mail.ru"
          className="flex items-center mt-2 text-blue-800"
        >
          <MdOutlineEmail className="text-xl" />
          &nbsp; sglo48@mail.ru
        </a>
        <div className="flex justify-start mt-2">
          <FaVk className="text-3xl hover:text-blue-600" />
          <FaOdnoklassnikiSquare className="text-3xl hover:text-orange-600" />
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
