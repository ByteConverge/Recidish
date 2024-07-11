/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import HeroSection from "../Recidish_Components/HeroSection";
import Footer from "../Recidish_Components/Footer";
import NavBar from "../Recidish_Components/ResNavbar";


export default function About() {
  return (
    <>
      <NavBar />
      <HeroSection />
      {/* Homepage body */}
      <main className="min-h-[70vh] my-[1rem] sm:w-[95%] sm:mx-auto">
        <div id="what we offer" className="sm:min-h-[5vh]  ">
          <h1 className="sm:text-[#996D3E] sm:text-[40px]">What we offer</h1>
          <p className="sm:text-[24px] sm:font-[600] ">
            At Recidish, we provide a comprehensive collection of authentic
            Nigerian recipes, complete with detailed instructions, ingredient
            lists, and cooking tips. Our goal is to make it easy for you to
            recreate the flavors of Nigeria in your own kitchen, no matter where
            you are in the world.
          </p>
          <ul className="sm:text-[24px] sm:font-[600] ">
            <li className="list-disc">
              Authentic Recipes: Each recipe on our site is carefully curated to
              ensure authenticity and taste. From traditional classics to modern
              twists, we offer a wide range of dishes that showcase the
              diversity of Nigerian cuisine.
            </li>
            <li className="list-disc">
              Step-by-Step Guides: Our recipes are designed to be easy to
              follow, with clear step-by-step instructions and helpful tips.
              Whether you are a novice cook or an experienced chef, you will
              find everything you need to create delicious Nigerian meals.
            </li>
            <li className="list-disc">
              Community Engagement: We believe that food brings people together.
              Our platform allows you to share your own recipes, rate and review
              others, and connect with fellow Nigerian food enthusiasts. Join
              our community and be inspired by the culinary creations of others.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
