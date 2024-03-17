import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import BASE_URL from "../assets/constant";
import Swal from "sweetalert2";
import axios from "axios";
const socket = io(`http://localhost:3011/`);

const DetailPayment = () => {
  const { state } = useLocation();
  const { url, orderId } = state;
  const navigate = useNavigate();
  const payment = () => {
    window.open(url, "_blank");
  };

  //   console.log(url, orderId);

  const donePayment = async () => {
    try {
      let { data } = await axios({
        method: "patch",
        url: `${BASE_URL}/payment`,
        data: { orderId: orderId },
      });

      Swal.fire({
        icon: 'success',
        title: "success",
        text: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/menu");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  //   useEffect(() => {
  //     console.log("masuk useEffect");
  //     socket.on(`payment_success`, (data) => {
  //       console.log(data);
  //     });

  //     socket.emit("reactEvent", { message: "Hello from react!" });

  //     socket.on("payment test", (data) => {
  //       console.log(data);
  //     });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  return (
    <div>
      <>
        {/* component */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        {/* <link rel="stylesheet" href="./assets/styles/styles.css" /> */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      .form-select {\n        background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");\n        background-repeat: no-repeat;\n        background-position: right 0.5rem center;\n        background-size: 1.5em 1.5em;\n        -webkit-tap-highlight-color: transparent;\n      }\n\n      .submit-button:disabled {\n        cursor: not-allowed;\n        background-color: #D1D5DB;\n        color: #111827;\n      }\n\n      .submit-button:disabled:hover {\n        background-color: #9CA3AF;\n      }\n\n      .credit-card {\n        max-width: 420px;\n        margin-top: 3rem;\n      }\n\n      @media only screen and (max-width: 420px)  {\n        .credit-card .front {\n          font-size: 100%;\n          padding: 0 2rem;\n          bottom: 2rem !important;\n        }\n\n        .credit-card .front .number {\n          margin-bottom: 0.5rem !important;\n        }\n      }\n    ",
          }}
        />
        <div className="m-4">
          <div
            className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white"
            x-data="creditCard">
            <header className="flex flex-col justify-center items-center">
              <div
                className="relative"
                x-show="card === 'front'"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 transform scale-90"
                x-transition:enter-end="opacity-100 transform scale-100">
                <img
                  className="w-full h-auto"
                  src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
                  alt="front credit card"
                />
                <div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
                  <p
                    className="number mb-5 sm:text-xl"
                    x-text="cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'"
                  />
                  <div className="flex flex-row justify-between">
                    <p x-text="cardholder !== '' ? cardholder : 'Card holder'" />
                    <div className="">
                      <span x-text="expired.month" />
                      <span x-show="expired.month !== ''">
                        Click Pay Now nya Bang
                      </span>
                      <span x-text="expired.year" />
                    </div>
                  </div>
                </div>
              </div>

              <ul className="flex">
                <li className="mx-2">
                  <img
                    className="w-16"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                    alt=""
                  />
                </li>
                <li className="mx-2">
                  <img
                    className="w-14"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                    alt=""
                  />
                </li>
                <li className="ml-5">
                  <img
                    className="w-7"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                    alt=""
                  />
                </li>
              </ul>
            </header>

            <footer className="mt-6 p-4">
              <button
                className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
                x-bind:disabled="!isValid"
                onClick={payment}>
                Pay now
              </button>
            </footer>
            <footer className="mt-6 p-4 gap-4 flex flex-col">
              <p className="text-xl font-bold text-center text-red-600">Clik Ketika Sudah Membayar</p>
              <button
                className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
                x-bind:disabled="!isValid"
                onClick={donePayment}>
                Done Payment
              </button>
            </footer>
          </div>
        </div>
      </>
    </div>
  );
};

export default DetailPayment;
