import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../assets/constant";

const Detail = () => {
  const [detail, setDetail] = useState({});
  let { id } = useParams();
  let token = localStorage.getItem("access_token");
  let currency = new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(detail.price);

  const fetchDetail = async () => {
    try {
      let data = await axios({
        method: "get",
        url: `${BASE_URL}/menu/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDetail(data.data.menu);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchDetail();
  }, []);
  return (
    <>
      <div>
        {/* <!-- component --> */}
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="flex font-sans">
            <div className="flex-none w-48 relative">
              <img
                src={detail.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <form className="flex-auto p-6">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-xl font-semibold text-gray-900">
                  {detail.name}
                </h1>
                <div className="text-lg font-semibold text-black-500">
                  {currency}
                </div>
                <div className="w-full flex-none text-sm font-medium text-black-700 mt-2">
                  calories: {detail.calories + " "}kcal
                </div>
              </div>
              <div className="flex space-x-4 mb-6 text-sm font-medium py-4">
                <div className="flex-auto flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900"
                    type="button"
                    onClick={() => {
                      addToCart({ id: detail.id });
                    }}>
                    Buy
                  </button>
                  <Link to={`/edit-menu/${detail.id}`}>
                    <button
                      className="h-10 bg-indigo-400 px-6 font-semibold rounded-md border border-balck-800 text-gray-900"
                      type="button">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
