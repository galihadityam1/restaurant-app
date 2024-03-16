import React, { useEffect, useState } from "react";
import BASE_URL from "../assets/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = ({ menu }) => {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    image: "",
    price: 0,
    calories: 0,
  });

  useEffect(() => {
    if (menu) {
      setInput(menu);
    }
  }, [menu]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input, "<<< ini input");
  }

  async function submitForm(event) {
    let method = "post";
    let url = `${BASE_URL}/menu`;
    menu && menu ? (method = "put") : method;
    menu && menu ? (url = `${BASE_URL}/menu/${menu.id}`) : url;
    event.preventDefault();
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios({
        method: method,
        url: url,
        data: input,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);

      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/menu");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <div class="bg-indigo-50 min-h-screen md:px-20 pt-6">
          <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
              ADD MENU
            </h1>
            <div class="space-y-4">
              <div>
                <label for="title" class="text-lx font-serif">
                  Name:
                </label>
                <input
                  value={input.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="name"
                  name="name"
                  id="name"
                  class="ml-2 w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="name" class="text-lx font-serif">
                  Price:
                </label>
                <input
                value={input.price}
                onChange={handleInputChange}
                  type="number"
                  placeholder="price"
                  name="price"
                  class="ml-2 w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="email" class="text-lx font-serif">
                  Calories:
                </label>
                <input
                value={input.calories}
                onChange={handleInputChange}
                  type="number"
                  placeholder="calories"
                  name="calories"
                  class="ml-2 w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <div>
                <label for="email" class="text-lx font-serif">
                  Image:
                </label>
                <input
                value={input.image}
                onChange={handleInputChange}
                  type="text"
                  placeholder="image.url"
                  name="image"
                  class="ml-2 w-full outline-none py-1 px-2 text-md border-2 rounded-md"
                />
              </div>
              <button type="submit" class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
                ADD MENU
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
