import { NavLink } from "react-router-dom";

export default function NavBar() {

  return (
    <header
      id="nav--links"
      className=" w-[80%] h-[10vh] mx-auto flex justify-between text-white p-[10px] mb-[1.2rem]"
    >
      <nav id="nav--one" className="w-[20%] h-[100%] flex justify-between">
        <figure id="logo" className="bg-white w-5">
          <img src="" alt="LOGO" width="40px" />
        </figure>
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
    </header>
  );
}
