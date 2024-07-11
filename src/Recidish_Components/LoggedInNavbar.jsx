import {  NavLink } from "react-router-dom";
import { useState } from "react";
import img from "../Recidish_Images/add-icon.svg"

export default function LoggedInNavBar() {
  const [hambugMenu, setHambugMenu] = useState(false);

  function handleClick() {
    setHambugMenu((prevState) => !prevState
);
  }

  function removeHandle() {
    setHambugMenu(false);
  }

//   const activeStyles = {
//     textDecoration: "underline",
//     fontSize: "1.5rem",
//   };

  return (
    <>
      <nav
        className={`flex justify-between items-center w-full py-4 px-8 sm:px-16 h-[10vh] fixed sm:absolute bg-white  z-50 sm:justify-between  sm:bg-black sm:bg-opacity-35 `}
      >
        <figure className="transform sm:translate-x-28 w-8 h-8 mb-1.5 sm:w-12 sm:h-12">
          <img src={img} alt="" className="w-full " />
        </figure>

        {/* Section */}
        <section className="hidden sm:flex sm:self-center sm:w-[50%] sm:mr-[20rem] ">
          <ul className="sm:flex sm:gap-5  sm:items-center sm:justify-center ">
            <li>
              <NavLink
                to="/loggedInHome"
                onClick={removeHandle}
                className="hover:underline text-[1.5rem]  text-white  transition duration-1000 ease-in-out "
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={removeHandle}
                className="hover:underline text-[1.5rem] text-white "
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                onClick={removeHandle}
                className="hover:underline text-[1.5rem] text-white  drop-shadow-2xl"
              >
                Premium Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                onClick={removeHandle}
                className=" hover:underline text-[1.5rem] text-[white] 
                "
              >
                Add Recipes
              </NavLink>
            </li>
          </ul>
          <figure className="transform sm:translate-x-28 w-8 h-8 mb-1.5 sm:w-12 sm:h-12">
            <img src={img} alt="" className="w-full " />
          </figure>
        </section>

        <span
          className="flex sm:hidden text-3xl cursor-pointer"
          onClick={handleClick}
        >
          {"\u2630"}
        </span>
        {/* Hamburger menu hidden */}
      </nav>
      {hambugMenu && (
        <section
          className={`fixed h-full w-[100vw]  bg-black/50 backdrop-blur top-0 right-0 sm:hidden z-50 text-black `}
        >
          <ul className="w-[60%] bg-white h-[100vh] flex flex-col justify-start gap-4">
            <li>
              <a className="text-[2rem] pl-4 cursor-pointer" onClick={removeHandle}>
                {"\u2715"}
              </a>
            </li>
            <li>
              <NavLink
                to="/loggedInHome"
                onClick={removeHandle}
                className="text-[1.5rem] pl-4"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink onClick={removeHandle} className="text-[1.5rem] pl-4">
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink onClick={removeHandle} className="text-[1.5rem] pl-4">
                Premium Recipes
              </NavLink>
            </li>
            <li>
              <NavLink onClick={removeHandle} className="text-[1.5rem] pl-4">
                Add Recipes
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
