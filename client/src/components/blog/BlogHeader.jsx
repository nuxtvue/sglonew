import { BiNews } from "react-icons/bi";
import { RiProfileLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/mainassets/Logo.svg";
import logowuor from "../../assets/mainassets/logowuor.svg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import RegisterDialog from "../register/register";
import LoginDialog from "../login/Login";
import useUserStore from "@/store/user";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BlogHeader = () => {
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user, logout } = useUserStore();
  const [searchValue, setSearchValue] = useState("");
  const [foundedBlogs, setFoundedBlogs] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      const res = await axios.get("/api/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    setSearchValue(e);
    try {
      console.log(e.length);

      const res = await axios.get(`/api/blog/search/${e}`);
      console.log(res);
      setFoundedBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="px-[30px] gap-4 flex flex-wrap sm:gap-6 justify-between items-center bg-pink-200/50 mt-2 rounded-lg  shadow-lg py-2 bg-[url('/mainimages/headerback.png')]  bg-right bg-cover">
      <Link to="/" className="flex flex-row">
        <div className="flex items-center">
          <div className="marck-script-regular text-center text-blue-700/70 text-[25px] hidden md:block">
            Союз женщин
            <br /> Липецкой области
          </div>
          <img src={Logo} alt="" width={120} loading="lazy" />
        </div>
        <div className="flex items-center">
          <div className="marck-script-regular text-center text-blue-700/70 text-[25px] hidden md:block">
            Союз женщин <br /> России
          </div>
          <img src={logowuor} alt="" width={108} loading="lazy" />
        </div>
      </Link>
      {/*ПОИСК */}
      <div className="flex items-center max-w-[300px] min-w-[200px] flex-1 relative">
        <Input
          placeholder="Поиск"
          className="border border-gray-500/30"
          defaultValue={searchValue}
          onBlur={(e) => {
            setTimeout(() => {
              setFoundedBlogs([]);
            }, 500);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e.target.value);
            }
          }}
        />
        {foundedBlogs.length > 0 && searchValue.length > 0 && (
          <ul className="absolute w-[500px] bg-white z-10 rounded-md top-10 ">
            {foundedBlogs.map((blog) => (
              <li>
                <Link
                  to={`/blog/${blog.url}`}
                  key={blog._id}
                  className="hover:bg-gray-100 flex items-center gap-2 shadow-sm p-2 bg-gray-50 rounded-md"
                >
                  {" "}
                  <img
                    src={"/" + blog.coverImageName[0].path}
                    alt=""
                    width={50}
                    className="object-cover rounded-md"
                    loading="lazy"
                  />
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="bg-pink-500/10 rounded-lg text-blue-700/80 p-2 border flex items-center justify-center border-pink-500/20 hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold">
          <BiNews className="text-2xl" />

          <Link to="/blog"> &nbsp;Новости</Link>
        </div>
        {!user ? (
          <>
            <div
              className="bg-pink-500/10 rounded-lg p-2 text-blue-700/80 border flex items-center justify-center border-pink-500/20 hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold"
              onClick={() => setShowLoginDialog(true)}
            >
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
          </>
        ) : (
          <div className="flex items-center gap-2">
            {user.role === "admin" && (
              <Link to="/admin" className="">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{user.login.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            {user.role === "user" && (
              <Link to="/profile" className="">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{user.login.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
            )}

            <div
              className="bg-pink-500/10 rounded-lg p-2 text-blue-700/80 border flex items-center justify-center border-pink-500/20 hover:bg-pink-500/40 hover:text-white cursor-pointer font-semibold"
              onClick={() => handleLogout()}
            >
              <BiLogIn className="text-2xl" />
              <span> &nbsp;Выйти</span>
            </div>
          </div>
        )}

        <RegisterDialog
          showRegisterDialog={showRegisterDialog}
          setShowRegisterDialog={setShowRegisterDialog}
        />
        <LoginDialog
          showLoginDialog={showLoginDialog}
          setShowLoginDialog={setShowLoginDialog}
        />
      </div>
    </div>
  );
};

export default BlogHeader;
