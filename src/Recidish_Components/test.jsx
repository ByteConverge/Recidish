import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [hambugMenu, setHambugMenu] = useState(false);

  function handleClick() {
    setHambugMenu((prevState) => !prevState);
  }

  function removeHandle() {
    setHambugMenu(false);
  }

  const activeStyles = {
    textDecoration: "underline",
    fontSize: "1.5rem",
  };

  return (
    <nav
      className={`flex justify-between items-center w-full py-4 px-8 sm:px-16 h-[10vh] fixed sm:absolute bg-white sm:bg-[#ffffff65] z-50 `}
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
            className="hover:underline text-xl"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            onClick={removeHandle}
            className="hover:underline text-xl"
          >
            About
          </NavLink>
          <NavLink to="/" className="hover:underline text-xl">
            FAQ
          </NavLink>
        </div>
        <div className="w-full sm:w-2/5 flex justify-center items-center gap-4">
          <Link
            to="/signIn"
            className="h-12 w-28 flex items-center justify-center border text-[black] bg-[#DEAA72] rounded-[5px] font-bold"
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
  );
}
