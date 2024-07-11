import {Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import img from "../Recidish_Images/add-icon.svg";

export default function LoggedInNavBar() {
  const [hambugMenu, setHambugMenu] = useState(false);

  function handleClick() {
    setHambugMenu((prevState) => !prevState);
  }

  function removeHandle() {
    setHambugMenu(false);
  }

    const activeStyles = {
      textDecoration: "underline",
      fontSize: "1.8rem",
      
    };

  return (
    <>
      <nav
        className={`flex justify-between items-center w-full py-4 px-8 sm:px-16 h-[10vh] fixed sm:absolute bg-white sm:bg-black sm:bg-opacity-35 z-50 `}
      >
        <figure className="transform sm:translate-x-28 w-8 h-8 mb-1.5 sm:w-12 sm:h-12">
          <img src="enomalogo2.PNG" alt="" className="w-full " />
        </figure>
        <div
          className={`
          hidden sm:flex
         w-full sm:w-1/2 sm:flex-row sm:bg-transparent  sm:relative sm:top-0 sm:text-bla sm:mr-20  sm:text-black flex-col justify-between items-center  bg-[black] fixed  top-[10vh] left-0 h-[90vh] sm:h-auto z-40  text-white`}
        >
          <div className="w-full sm:w-2/5 flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-4 font-medium text-lg sm:text-base">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={removeHandle}
              className="hover:underline text-[1.5rem] font-[inter] text-white  transition duration-1000 ease-in-out"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={removeHandle}
              className="hover:underline text-[1.5rem] font-[inter] text-white  transition duration-1000 ease-in-out"
            >
              About us
            </NavLink>
          </div>
          <div className="w-full sm:w-2/5 flex justify-center items-center gap-4">
            <Link
              to="/signIn"
              className="h-12 w-28 flex items-center justify-center border text-[black] bg-[#DEAA72] rounded-[5px] font-bold "
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="h-12 w-28  grid place-items-center bg-[#996D3E] rounded-[5px] font-bold"
            >
              Sign up
            </Link>
          </div>
        </div>
        <span
          className="flex sm:hidden text-3xl cursor-pointer"
          onClick={handleClick}
        >
          {hambugMenu ? "\u2715" : "\u2630"}
        </span>
      </nav>
      {hambugMenu && (
        <section
          className={`fixed h-full w-[100vw]  bg-black/50 backdrop-blur top-0 right-0 sm:hidden z-50 text-black `}
        >
          <ul className="w-[60%] bg-white h-[100vh] flex flex-col justify-start gap-4">
            <li>
              <a
                className="text-[2rem] pl-4 cursor-pointer"
                onClick={removeHandle}
              >
                {"\u2715"}
              </a>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={removeHandle}
                className="text-[1.5rem] pl-4"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                onClick={removeHandle}
                className="text-[1.5rem] pl-4"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <Link
                to="/signIn"
                className="h-12 w-full flex items-center justify-center border text-[black] bg-[#DEAA72] rounded-[5px] font-bold"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signUp"
                className="h-12 w-full  grid place-items-center bg-[#996D3E] rounded-[5px] font-bold"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </section>
      )}
    </>
  );
}
