import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let [nav, setNav] = useState(false);
  let navigate = useNavigate();
  const navbarList = ["/menu", "/add"];

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 h-24 w-full min-w-max bg-white border-gray-200 dark:bg-gray-900 px-8">
        <h1 className="w-full text-3xl text-green-400 font-bold">REACT.</h1>
        <ul className="hidden md:flex gap-5 text-green-400">
          {navbarList.map((el, index) => {
            return (
              <Link
                to={el}
                key={index}
                className="block py-2 px-3 rounded md:bg-transparent">
                {el === "/menu"
                  ? "Home"
                  : el === "/add"
                  }
              </Link>
            );
          })}
          <a
            className="lock md:bg-transparent ocus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}>
            Log Out
          </a>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          <AiOutlineMenu
            className="flex right-3 text-green-400"
            style={{ cursor: "pointer" }}
            size={25}
          />
        </div>
        <div className={!nav ? "hidden" : undefined}>
          <div
            onClick={handleNav}
            className="fixed right-0 top-0 w-[50%] h-full border-r border-r-gray-700 dark:bg-gray-900 z-10">
            {nav ? (
              <AiOutlineMenu
                className="fixed right-3 top-5 text-green-400"
                style={{ cursor: "pointer" }}
                size={25}
              />
            ) : undefined}
            <ul className="pt-24 flex flex-col gap-4 text-green-400 max-w-screen-xl mx-auto p-4 h-24">
              {navbarList.map((el, index) => {
                return (
                  <Link to={el} key={index}>
                    {el === "/menu"
                      ? "Home"
                      : el === "/add"
                      }
                  </Link>
                );
              })}
              <a
                className="lock md:bg-transparent ocus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}>
                Log Out
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
