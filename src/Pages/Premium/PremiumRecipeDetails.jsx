import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../Recidish_Components/Footer";

export default function PremiumRecipeDetails() {
  const [Post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

  let { id } = useParams();
  let jwt = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPost() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://recidishbackend.onrender.com/api/premium/premiumSinglePost/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [jwt, id]);

  const getStepsArray = (text) => {
    if (!text) return [];
    return text
      .split(/\d+\.\s|\.\s|\n/)
      .filter(Boolean)
      .map((step) => step.trim());
  };

  const stepsArray = getStepsArray(Post.text);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F7F3F0] flex flex-col min-h-screen font-inter">
        <div
          id="hero"
          style={{ backgroundImage: `url(${Post.img})` }}
          className="bg-center min-h-[60vh] sm:min-h-[80vh] bg-cover w-full transition-all duration-500 ease-in-out transform hover:scale-105"
        ></div>
        <div
          id="card"
          className="px-8 md:px-16 py-8 md:py-16 bg-white shadow-xl rounded-tl-[60px] rounded-tr-[60px] -mt-[5rem] z-10 mx-auto w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] relative"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            {Post.title}
          </h1>
          <div className="text-lg md:text-xl text-gray-700 mb-8">
            <h2 className="font-semibold mb-4">Ingredients:</h2>
            <div className="leading-relaxed">{Post.ingredients}</div>
          </div>

          <div className="text-lg md:text-xl text-gray-700 mb-8">
            <h2 className="font-semibold mb-4">How to Prepare:</h2>
            <ul className="list-disc pl-6 leading-relaxed">
              {stepsArray.map((step, index) => (
                <li key={index} className="mt-2">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {Post.tips && (
            <div className="text-lg md:text-xl text-gray-700">
              <h2 className="font-semibold mb-4">Recommended Tips:</h2>
              <p className="leading-relaxed">{Post.tips}</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
