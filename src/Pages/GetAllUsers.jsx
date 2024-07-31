import { useEffect } from "react"




export default function GetAllUsers() {
// const [users, setUsers] = useState([])

let token = localStorage.getItem("token")
console.log(token);

async function handleUsers(){
  let response =  await fetch("https://recidishbackend.onrender.com/api/user", {
    method: "GET",
    headers:{
        Authorization: `Bearer ${token}`
    }
  }) 
  let data = await response.json();
  console.log(data.data[0]);

}

useEffect(()=>{

handleUsers()

}, [])



  return (
    <div className="bg-black h-[100vh] text-white flex justify-center flex-col items-center">
      <h1>Users</h1>
      <ul>
        {/* {
        users.map(()=>{
            return <li></li>
        })
        } */}
      </ul>
      <button className="bg-blue-500 w-[5rem] rounded-[5rem]">click</button>

    </div>
  )
}
