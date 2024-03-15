import React from 'react'
import image from "../assets/pngwing.com.png";
import imageBg from "../assets/gradient.jpg";

const BgStyle = {
  backgroundImage: `url(${imageBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
};

const LandingPage = () => {
  return (
    <>
    <div style={BgStyle} className="relative z-[-1]">
        <div className="container py-16 sm:py-0">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center min-h-[600px]">
            {/* text-content section */}
            <div className="space-y-7 text-dark order-2 md:order-1">
              <h1 className="text-5xl">
                Fresh & Healthy Meal Plan{" "}
                <span className=" text-green-600 font-cursive text-7xl">
                  Delivery
                </span>{" "}
                in Jakarta
              </h1>
              <p className="lg:pr-64">
                Delicious Meals Delivered to your Door From Our Kitchen
              </p>
            
            </div>

            {/* image section */}
            <div className="relative z-30 order-1 md:order-2">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage