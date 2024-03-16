import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../assets/constant";

const EditPage = () => {
  const { id } = useParams();
//   console.log(id);
  const [menu, setMenu] = useState();
  let token = localStorage.getItem("access_token");

  const fetchMenu = async () => {
    try {
      let data = await axios({
        method: "get",
        url: `${BASE_URL}/menu/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);

      setMenu(data.data.menu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  return (
    <div>
      <Form menu={menu}/>
    </div>
  );
};

export default EditPage;
