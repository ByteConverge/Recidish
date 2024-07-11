import { NavLink } from "react-router-dom";

export default function NavBar() {


  return (
    <>
      <header
        id="nav--links"
        className=" sm:w-[80%] h-[10vh] mx-auto pt-[1rem] flex justify-between text-white p-[10px] mb-[1.2rem] w-[90%]"
      >
        <figure id="logo" className="bg-white w-[10%] sm:w-14">
          <img src="" alt="LOGO" width="40px" />
        </figure>
        {/* NavWrap */}
        <div id="NavWrap" className={`w-[70%] justify-end hidden  sm:flex`}>
          <nav
            id="nav--one"
            className="w-[20%] h-[100%] flex justify-between mr-[5%]"
          >
            <NavLink className="w-[5rem] grid place-items-center mx-[5%]">
              Home
            </NavLink>
            <NavLink className="w-[5rem] grid place-items-center">Home</NavLink>
          </nav>

          <nav id="nav--two" className="w-[20%] flex justify-between">
            <NavLink className="w-[45%] grid place-items-center text-[black] bg-[#DEAA72] rounded-[5px]">
              Login
            </NavLink>
            <NavLink className="w-[45%] grid place-items-center bg-[#996D3E] rounded-[5px]">
              Sign Up
            </NavLink>
          </nav>
        </div>
        {/* Hamburger */}
        <a className="cursor-pointer text-[2.5rem] w-[5rem] h-[100%]   flex items-center justify-center sm:hidden">
          &#9776;
        </a>
             
      </header>
    </>
  );
}
