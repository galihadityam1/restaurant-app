import React from "react";
import PrimaryButton from "./button/PrimaryButton";

const Banner = () => {
  return (
    <>
      <div className="h-dvh">
        <div className="container">
          <div>
            <h1 className="py-8 tracking-wider text-2xl font-semibold text-dark text-center">
              Taste the Healthy Difference
            </h1>

            {/* content section */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
                <div className="text-lg">
                  <p className="text-left">
                    We know that{" "}
                    <span className="text-primary">time</span> is
                    the greatest value in the modern world. Our healthy meal
                    plan delviery service Good Food in Jakarta is the answer for
                    those who want to eat healthily, saving time for buying food
                    and preparing delicious, healthy meals.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-10">
                <div></div>
                <div className="text-lg">
                  <p className="text-right">
                  Culinary Bliss in Jakarta: Indulge in Delectable Delights from Our Kitchen. Experience a Symphony of Flavors Crafted to Perfection. Savor Every Bite of Authentic Cuisine, Infused with Local and Global Influences. Discover Gastronomic Excellence, Right at Your Table.
                  </p>
                </div>
              </div>
            </div>

            {/* button section */}
            <div className="flex justify-center mt-10 sm:mt-14">
              <PrimaryButton />
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffb6b6" fill-opacity="1" d="M0,160L40,160C80,160,160,160,240,149.3C320,139,400,117,480,138.7C560,160,640,224,720,234.7C800,245,880,203,960,181.3C1040,160,1120,160,1200,160C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
      </div>
    </>
  );
};

export default Banner;
