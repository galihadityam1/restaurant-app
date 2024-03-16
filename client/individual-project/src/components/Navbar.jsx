import React, { useState } from "react";
import { FaCaretDown, FaUser } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
const navbarList = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Menu",
    link: "/menu",
  },
  {
    id: 3,
    name: "Add",
    link: "/add-menu",
  },
];

const Navbar = () => {
  let [nav, setNav] = useState(false);
  let navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div>
        <div className="bg-white shadow-md">
          <div className="container flex justify-between py-4 sm:py-3">
            {/* logo section */}
            <div className="font-bold text-3xl">Logo</div>
            {/* navlink section */}
            <ul className="flex items-center gap-10">
              {navbarList.map(({ id, name, link }) => (
                <li key={id}>
                  <a
                    href={link}
                    className="inline-block hover:text-primary text-xl font-semibold">
                    {name}
                  </a>
                </li>
              ))}

              {/* logout button */}
              <li>
                <button
                  className=" flex justify-center items-center gap-2 bg-red-500 text-xl h-[40px] text-white px-5 py-2 hover:scale-105 duration-300"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    navigate("/login");
                  }}>
                  <FaUser />
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
