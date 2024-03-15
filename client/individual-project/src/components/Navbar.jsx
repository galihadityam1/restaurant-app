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
    id: 1,
    name: "About",
    link: "/",
  },
  {
    id: 1,
    name: "Contact",
    link: "/",
  },
];

const sortList = [
  {
    id: 1,
    name: "Price",
    link: "/",
  },
  {
    id: 1,
    name: "Calories",
    link: "/",
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

              {/* simple dropdown and links */}
              <li className="cursot-pointer group relative">
                <a
                  href=""
                  className="inline-block hover:text-primary text-xl font-semibold">
                  <div className="flex items-center gap-[2px] py-2">
                    Sort by
                    <span>
                      <FaCaretDown className="group-hover:rotate-180 duration-300" />
                    </span>
                  </div>
                </a>

                {/* dropdown section */}
                <div className=" absolute hidden z-[999] group-hover:block w-[200px] bg-white text-black shadow-md p-2">
                  <ul>
                    {sortList.map(({ id, name, link }) => (
                      <li key={id}>
                        <a
                          href=""
                          className="text-xl inline-block w-full rounded-md p-2 hover::bg-primary/20">
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* login button */}
              <li>
                <button className=" flex justify-center items-center gap-2 bg-secondary text-xl h-[40px] text-white px-5 py-2 hover:scale-105 duration-300">
                  <FaUser />
                  Login
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
