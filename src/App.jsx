/* eslint-disable no-unused-vars */
import { BrowserRouter , Routes ,Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import SignInPage from "./Pages/SignInPage"
import About from "./Pages/About"
import SignUpPage from "./Pages/SignUpPage"

const loggedInStatus = localStorage.getItem("isLoggedIn")
let loggedInPage ;
if(loggedInStatus === "true"){
  loggedInPage = <SignUpPage />
}else{
  loggedInPage = <HomePage />
}
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="signUp" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App
