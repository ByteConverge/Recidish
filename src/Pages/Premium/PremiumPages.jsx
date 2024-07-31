import { Link } from "react-router-dom";
import Body from "../../Recidish_Components/Body";
import HomeCards from "../../Recidish_Components/HomeCards";

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


export default function PremiumPages() {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  let jwt = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBored() {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `https://recidishbackend.onrender.com/api/premium/premiumPosts`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await response.json();
        setPosts(data.posts);
        setLoading(false); // End loading
      } catch (error) {
        setLoading(false);
      }
    }

    fetchBored();
  }, [jwt]);
  console.log(Posts);

  return (
    <Body>
      <div
        id="cards"
        className={`px-[4%] min-h-[10vh] my-2 mb-[1rem] flex flex-col gap-2 sm:mx-auto sm:w-[95%] sm:grid ${
          Posts.length === 0 ? "sm:grid-cols-1" : "sm:grid-cols-3"
        } sm:gap-x-16 sm:gap-y-8`}
      >
        {loading ? (
          <div className="flex justify-center items-center min-h-[20vh]">
            <ClipLoader size={50} color={"black"} loading={loading} />
          </div>
        ) : Posts.length === 0 ? (
          <p className="text-center text-black text-[1rem]  mt-[1rem] font-poppins font-light block w-[100%]  md:text-[2rem] md:w-[100%]">
            No Recipe found
          </p>
        ) : (
          <>
            {[...Posts].map((post) => {
                  let slicedSteps = post.text.slice(0, 50);
                  let slicedTitle = post.title.slice(0, 25);

              
                  return (
                    <Link
                      key={post._id}
                      to={`/loggedIn/PremiumRecipeDetails/${post._id}`}
                    >
                      <HomeCards
                        key={post._id}
                        title={slicedTitle}
                        recipeImg={post.img}
                        steps={slicedSteps}
                        review={post.replies.length}
                      />
                    </Link>
                  );
                })
            }
          </>
        )}
      </div>
    </Body>
  );
}
