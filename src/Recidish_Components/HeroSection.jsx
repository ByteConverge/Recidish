/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import friedRice from "../Recidish_Images/Fried-Rice-two.png";
import pounded from "../Recidish_Images/PoundedYam-Soup.png";
import riceStew from "../Recidish_Images/Rice-Stew.png";
import crisp from "../Recidish_Images/Crisp-.png";



export default function HeroSection() {

      let bgImg = [friedRice, pounded, riceStew, crisp];
      const [bgIndex, setBgIndex] = useState(1);
      const intervalDuration = 2500;

      useEffect(() => {
        const interval = setInterval(() => {
          setBgIndex((prevIndex) => {
            return (prevIndex === bgImg.length -1 ? 0 : prevIndex + 1)
          });
        }, intervalDuration);
        return () => clearInterval(interval);
      }, [bgImg.length, intervalDuration]);
  return (
    
      <div
        id="hero"
        style={{ backgroundImage: `url(${bgImg[bgIndex]
        })` }}
        className={`bg-center h-screen `}
      >
       <NavBar />
        <div
          id="hero--texts"
          className="w-[80%] mx-auto h-[85vh] rounded-[1rem] bg-[#00000075] p-9 text-white flex flex-col text-center justify-center gap-[2rem] "
        >
          <h1 className="text-[40px]">Discover Delicious Recipes</h1>
          <p className="text-[20px] w-[85%] self-center p-1">
            Welcome to Recidish - Your ultimate destination for culinary
            inspiration! Explore a world of flavors and discover mouth-watering
            recipes tailored to your taste buds. Whether you are a seasoned chef
            or just starting your cooking journey, our service offers a diverse
            collection of recipes to suit every skill level and dietary
            preference.
          </p>
          <Link className="w-[30%] h-[69px] bg-[#996D3E] text-[black] rounded-[20px] text-[40px] self-center">
            Get Started
          </Link>
        </div>
        {/* */}
      </div>
  );
}
