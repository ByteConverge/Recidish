/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import friedRice from "../Recidish_Images/Fried-Rice-two.png";
import pounded from "../Recidish_Images/PoundedYam-Soup.png";
import riceStew from "../Recidish_Images/Rice-Stew.png";
import crisp from "../Recidish_Images/Crisp-.png";

export default function LoggedInHeroSection() {
  let bgImg = [friedRice, pounded, riceStew, crisp];
  const [bgIndex, setBgIndex] = useState(1);
  const intervalDuration = 2500;

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => {
        return prevIndex === bgImg.length - 1 ? 0 : prevIndex + 1;
      });
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [bgImg.length, intervalDuration]);
  return (
    <div
      id="hero"
      style={{ backgroundImage: `url(${bgImg[0]})` }}
      className={`bg-center h-[100vh] grid place-items-center`}
    >
      <div
        id="hero--texts"
        className="w-[80%] mx-auto mt-[6%] h-[85vh] rounded-[1rem] bg-[#00000075] p-9 text-white flex flex-col text-center justify-center gap-[2rem] "
      >
        <h1 className="md:text-[2.5rem] text-[1.4rem] ">
          Discover Delicious Recipes
        </h1>
        <p className="md:text-[20px] md:w-[85%] sm:text-[20px] self-center p-1 text-[12px] w-[100%] ">
          Welcome to Recidish - Your ultimate destination for culinary
          inspiration! Explore a world of flavors and discover mouth-watering
          recipes tailored to your taste buds. Whether you are a seasoned chef
          or just starting your cooking journey, our service offers a diverse
          collection of recipes to suit every skill level and dietary
          preference.
        </p>
      </div>
      {/* */}
    </div>
  );
}
