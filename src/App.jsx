import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/HomePage"
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import Payment from "./Recidish_Components/ForgotPassword";
import Verify from "./Recidish_Components/ResetPassword";
import Test from "./Pages/GetAllUsers";
import PremiumAddRecipe from "./Pages/Premium/PremiumAddRecipe";
import PremiumPages from "./Pages/Premium/PremiumPages";
import PremiumRecipeDetails from "./Pages/Premium/PremiumRecipeDetails";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Not logged in */}

        <Route path="/" element={<Homepage />} />

        <Route path="/users" element={<Test />} />

        {/* Redirect if authenticated */}
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />

        <Route path="/payment" element={<Payment />} />

        <Route path="/verify" element={<Verify />} />

        {/* Premium */}
        <Route path="/premiumAdd" element={<PremiumAddRecipe />} />
        <Route path="/premium" element={<PremiumPages />} />
        <Route
          path="/loggedIn/PremiumRecipeDetails/:id"
          element={
            
              <PremiumRecipeDetails />
            
          }
        />
        {/*  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
