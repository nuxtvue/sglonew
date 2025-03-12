import { BiNews } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import React, { useState } from "react";
import Logo from "../../assets/mainassets/Logo.svg";
import logowuor from "../../assets/mainassets/logowuor.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import RegisterDialog from "../register/register";

const BlogHeader = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  return (
    <div className="px-[30px] gap-4 flex flex-wrap sm:gap-6 justify-between items-center bg-pink-200/50 mt-2 rounded-lg  shadow-lg py-2 bg-[url('/mainimages/headerback.png')]  bg-right bg-cover">
      <Link to="/" className="flex flex-row">
        <div className="flex items-center">
          <div className="marck-script-regular text-center text-blue-700/70 text-[25px] hidden md:block">
            Союз женщин
            <br /> Липецкой области
          </div>
          <img src={Logo} alt="" width={120} />
        </div>
        <div className="flex items-center">
          <div className="marck-script-regular text-center text-blue-700/70 text-[25px] hidden md:block">
            Союз женщин <br /> России
          </div>
          <img src={logowuor} alt="" width={108} />
        </div>
      </Link>
      {/*ПОИСК */}
      <div className="flex items-center">
        <Input placeholder="Поиск" className="border border-gray-500/30" />
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-pink-500/10 rounded-lg text-blue-700/80 p-2 border flex items-center justify-center border-pink-500/20 hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold">
          <BiNews className="text-2xl" />

          <Link to="/blog"> &nbsp;Новости</Link>
        </div>
        <div className="bg-pink-500/10 rounded-lg p-2 text-blue-700/80 border flex items-center justify-center border-pink-500/20 hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold">
          <BiLogIn className="text-2xl" />
          <span> &nbsp;Войти</span>
        </div>
        <div
          className="bg-pink-500/10 rounded-lg p-2 border text-blue-700/80 border-pink-500/20 flex items-center justify-center hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold"
          onClick={() => setShowRegisterDialog(true)}
        >
          <RiProfileLine className="text-2xl" />
          &nbsp; Регистрация
        </div>
        <RegisterDialog
          showRegisterDialog={showRegisterDialog}
          setShowRegisterDialog={setShowRegisterDialog}
        />
      </div>
    </div>
  );
};

export default BlogHeader;
