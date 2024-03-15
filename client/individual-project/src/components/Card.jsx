import React from "react";
import { FaCartPlus } from "react-icons/fa";

const Card = ({ menu }) => {
  let currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(menu.price);

  const addToCart = async () => {
    try {
        await axios({
            
        })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm h-full bg-white">
        <a
          href=""
          className="hover:text-orange-600 absolute z-30 top-2 right-0 mt-2 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </a>
        <a href="" className="z-20 absolute h-full w-full top-0 left-0 ">
          &nbsp;
        </a>
        <div className="h-auto overflow-hidden">
          <div className="h-44 overflow-hidden relative">
            <img src={menu.image} alt="" />
          </div>
        </div>
        <div className="bg-white py-4 px-3">
          <h3 className="text-xs mb-2 font-medium">{menu.name}</h3>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400">{currency}</p>
            <div className="relative z-40 flex items-center gap-2">
              <a className="text-orange-600 hover:text-blue-500" href="">
                <FaCartPlus className="h-4 w-5" />
              </a>
              <a className="text-orange-600 hover:text-blue-500" href=""></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
