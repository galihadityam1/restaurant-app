import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../assets/constant";
import { Link, redirect, useNavigate } from "react-router-dom";

const Card = ({ menu }) => {
  let currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(menu.price);
  //   let [transactionToken, setTransactionToken] = useState()
  let navigate = useNavigate();
  let token = localStorage.getItem("access_token");

  const addToCart = async ({ id }) => {
    try {
      // console.log(id);
      let data = await axios({
        method: "post",
        url: `${BASE_URL}/menu/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // navigate(`${data.transactionUrl}`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to={`/menu/${menu.id}`}>
        <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm h-full bg-white">
          <div className="h-auto overflow-hidden w-full">
            <div className="h-44 overflow-hidden relative w-full">
              <img src={menu.image} alt="" />
            </div>
          </div>
          <div className="bg-white py-4 px-3">
            <h3 className="text-xs mb-2 font-medium">{menu.name}</h3>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">{currency}</p>
              <div className="relative z-40 flex items-center gap-2">
                <a
                  className="text-orange-600 hover:text-blue-500"
                  onClick={() => {
                    addToCart({ id: menu.id });
                  }}>
                  <FaCartPlus className="h-4 w-5" />
                </a>
                <a className="text-orange-600 hover:text-blue-500" href=""></a>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
