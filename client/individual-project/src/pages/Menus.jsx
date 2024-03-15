import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";
import Card from "../components/Card";
import BASE_URL from "../assets/constant";
const sortList = [
  {
    id: 1,
    name: "Price",
    value: "price",
  },
  {
    id: 2,
    name: "Calories",
    value: "calories",
  },
];

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [page, setPage] = useState();
  const [params, setParams] = useState({});

  let token = localStorage.getItem("access_token");

  function handlePage(number) {
    // console.log(number);
    setParams({ ...params, "page[number]": number });
  }

  const FetchMenu = async () => {
    try {
      let data = await axios({
        method: "get",
        url: `${BASE_URL}/menu`,
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);

      setMenus(data.data.data);
      setPage(data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchMenu();
  }, [params]);

  const sort = (value) => {
    if (value === "price") {
      setParams({ ...params, sort: value });
    } else if (value === "calories") {
      setParams({ ...params, sort: value });
    } else {
      setParams({ ...params, sort: undefined });
    }
  };

  const handleSort = (event) => {
    // console.log(event);
    const { value } = event;
    sort(value);
  };

  let totalPage = [];
  for (let i = 1; i <= page; i++) {
    totalPage.push(i);
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray- py-6 sm:py-12 bg-gradient-to-br from-fuchsia-50 to-fuchsia-200">
      <div>
        <div className="cursot-pointer group relative justify-center items-center w-15">
          <a
            href=""
            className="inline-block hover:text-primary text-xl font-semibold">
            <div className="flex items-center justify-center px-10 gap-[2px] py-2 ">
              Sort by
              <span>
                <FaCaretDown className="group-hover:rotate-180 duration-300" />
              </span>
            </div>
          </a>

          {/* dropdown section */}
          <div className=" absolute hidden z-[999] group-hover:block w-[200px] bg-white text-black shadow-md p-2">
            <ul>
              {sortList.map(({ id, name, value }) => (
                <li key={id}>
                  <a
                    onClick={() => {
                      handleSort({ value });
                    }}
                    className="text-xl inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 w-full">
        <h2 className="mb-4 font-bold text-xl text-gray-600">Menu List.</h2>
        <div className="grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {menus && menus.map((menu) => <Card menu={menu} key={menu.id} />)}
        </div>
        {/* <!-- component --> */}
        <nav className="gap-4 py-10 items-center justify-center flex">
          <ul className="flex">
            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                aria-label="Previous">
                <span className="material-icons text-sm">
                  keyboard_arrow_left
                </span>
              </a>
            </li>
            {page
              ? totalPage.map((el, i) => (
                  <li key={el} className="page-item" name="page[number]">
                    <a
                      onClick={() => handlePage(el)}
                      className="mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-pink-600 to-pink-400 p-0 text-sm text-white shadow-md shadow-pink-500/20 transition duration-150 ease-in-out"
                      href="#">
                      {el}
                    </a>
                  </li>
                ))
              : ""}
            <li>
              <a
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                href="#"
                aria-label="Next">
                <span className="material-icons text-sm">
                  keyboard_arrow_right
                </span>
              </a>
            </li>
          </ul>
        </nav>

        {/* <!-- stylesheet --> */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        />
        {/* <!-- Material Icons Link --> */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      </div>
    </div>
  );
};

export default Menus;
