/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";


export default function Recipes() {
  const [user, setUser] = useState([]);
 
  let jwt = localStorage.getItem("token")

  useEffect(() => {
    async function fetchBored() {
      const response = await fetch(
        `https://recidishbackend.onrender.com/api/post/`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

    //   console.log(response);

      const data = await response.json();

      console.log(data.posts);
      setUser(data.posts);
    }

    fetchBored();
  }, [jwt]);




  return (
    <div className="jokesWrapper">
      <h1 className="text-center text-[2rem]">HELLO</h1>
      <ul >
       {
        user.map((post)=>{
        return (
          <li key={post.id} className="border-red-500 border-[1px]">
            {post.text}||{post.title}
          </li>
        );    
        })
       }      
      </ul>
    </div>
  );
}
