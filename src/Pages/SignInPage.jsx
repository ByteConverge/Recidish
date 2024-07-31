/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInImg from "../Recidish_Images/sign-in-bgImage.svg";
import googleImg from "../Recidish_Images/googleLogo.svg";
import facebookImg from "../Recidish_Images/fb-sign.svg";
import React from "react";

function SignInPage() {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return passwordPattern.test(password);
  };

  const validate = () => {
    let tempErrors = {};
    // Add any validation logic here if needed
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };

    if (name === "email" && !validateEmail(value)) {
      tempErrors.email = "Email is not valid.";
    } else {
      delete tempErrors.email;
    }

    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "All fields are required",
      }));

      setTimeout(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: "",
        }));
      }, 2000);
      return;
    }

    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://recidishbackend.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log("Login Response Data:", data); // Log the response data

        setIsLoading(false);

        if (response.ok) {
          setIsSubmitted(true);
          setIsModalOpen(true);
          window.localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            navigate("/loggedInHome");
          }, 3000);
        } else {
          setErrors({ api: data.message || "Wrong Email or password" });
          setTimeout(() => {
            setErrors({ api: "" });
          }, 6000);
          console.log("Login Error Response:", data); // Log the error response
        }

        localStorage.setItem("token", data.accessToken);
      } catch (error) {
        setIsLoading(false);
        setErrors({ api: "Poor Network. Try again! " });
        console.log("Login Network Error:", error);
      }
    }
  };
        // HANDLE SUBMIT
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(forgotPasswordEmail)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        forgotPassword: "Invalid email address.",
      }));
      return;
    }

    try {
      const response = await fetch(
        "https://recidishbackend.onrender.com/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: forgotPasswordEmail ,
        }
      );

      const data = await response.json();
      console.log("Forgot Password Response Data:", data); // Log the response data
      console.log(data);

      if (response.ok) {
        alert("Password reset email sent successfully.");
        setIsForgotPasswordModalOpen(false);
      } else {
        setErrors({
          forgotPassword: data.message || "Failed to send reset email.",
        });
        console.log("Forgot Password Error Response:", data); // Log the error response
      }
    } catch (error) {
      setErrors({ forgotPassword: "Network error. Please try again later." });
      console.log("Forgot Password Network Error:", error);
    }
  };

  return (
    // Background Overall
    <div
      id="backgroundOverall"
      className={`w-[100%] min-h-[100vh] sm:bg-cover sm:bg-no-repeat sm:grid sm:place-items-center`}
      style={{ backgroundImage: `url(${signInImg})` }}
    >
      {/* form wrapper black--cover*/}
      <div
        id="form wrapper"
        className="w-[100%] min-h-[100vh] bg-black bg-opacity-50 flex flex-col sm:w-[50%] sm:h-[80vh] sm:rounded-[2rem]"
      >
        {/* Form section */}
        <form
          id="form section"
          className="text-white flex flex-col justify-start gap-0 px-5 py-7 items-center h-[100%] sm:h-[90%] sm:w-[70%] sm:justify-start sm:gap-0 sm:mt-2 sm:mx-auto sm:translate-y-7"
          onSubmit={handleSubmit}
        >
          {/* social-media-signin  */}
          <div id="SocialMediaSignings" className="flex flex-col gap-3 w-full">
            {/* google signing */}
            <a
              id="google-signin"
              href="#"
              className="flex bg-white text-black justify-center gap-1 p-1 rounded-3xl"
            >
              <img src={googleImg} alt="" className="h-[1.5rem]" />
              <h1>Continue with Google</h1>
            </a>
            {/* facebook sign in */}
            <a
              id="facebook-signin"
              href="#"
              className="flex bg-white text-black justify-center gap-1 p-1 rounded-3xl items-center"
            >
              <img
                src={facebookImg}
                alt=""
                className="h-[1.5rem] translate-y-1"
              />
              <h1>Continue with Facebook</h1>
            </a>
          </div>
          {/* Or */}
          <div className="flex gap-1 justify-center items-center my-2 w-[100%]">
            <span className="w-[50%] h-[1px] bg-white"></span> OR
            <span className="w-[50%] h-[1px] bg-white"></span>
          </div>
          {/* h1{sign Up} */}
          <h1 className="text-[1.4rem] w-[100%] flex flex-col justify-en sm:mb-2">
            Sign In
          </h1>
          {/* form content */}
          <div
            id="form-content"
            className="w-[100%] h-[90%] flex flex-col gap-1 sm:gap-0"
          >
            {/* error message top*/}
            {errors.form && (
              <p className="bg-black text-red-500 text-center rounded ">
                {errors.form}
              </p>
            )}
            {errors.api && (
              <p className="bg-black text-red-500 text-center rounded ">
                {errors.api}
              </p>
            )}
            {errors.forgotPassword && (
              <p className="bg-black text-red-500 text-center rounded ">
                {errors.forgotPassword}
              </p>
            )}

            {/* Name Email Password div */}
            <div
              id="NameEmailPassword"
              className="flex flex-col gap-1 mb-4 sm:gap-0"
            >
              {/* Email */}
              <div className="mb-2 sm:mb-1">
                <label htmlFor="email" className="">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 block w-full border-white border-[1.5px] border-solid bg-black bg-opacity-50 focus:outline-none focus:border-white rounded-xl h-[2.5rem] sm:h-[1.7rem]"
                />
              </div>
              {/* Password */}
              <div className="mb-2 sm:mb-1">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 block w-full border-white border-[1.5px] border-solid bg-black bg-opacity-50 focus:outline-none focus:border-white rounded-xl h-[2.5rem] sm:h-[1.7rem]"
                />
              </div>

              {/* Show password */}
              <div className="flex w-full justify-between sm:relative sm:bottom-2 sm:h-[10%] sm:mt-1 sm:pl-2">
                <span className="">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="check">Show password</label>
                </span>
              </div>
            </div>
            {/* Sign In button */}
            <div className="signin w-full sm:mx-auto">
              <button
                className={`signin-button w-full ${
                  isLoading ? "bg-[#6a614b]" : "bg-[#996D3E]"
                } rounded-3xl h-[3rem] mb-2 sm:h-[1.7rem]`}
                id="signUp"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-t-4 border-b-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Sign In"
                )}
              </button>
              <p className="w-full">
                Have an account? <Link to="/signUp">Sign Up</Link>
              </p>
              <p className="w-full text-center mt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordModalOpen(true)}
                  className="text-blue-400 underline"
                >
                  Forgot Password?
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Success modal */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-white p-6 rounded">
            <h2 className="text-2xl mb-4 text-center text-green-400">
              Success!
            </h2>
            <p>Login successful.</p>
          </div>
        </div>
      )}

      {/* Forgot Password modal */}
      {isForgotPasswordModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-white p-6 rounded">
            <h2 className="text-2xl mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <label htmlFor="forgotPasswordEmail" className="block mb-2">
                Enter your email address
              </label>
              <input
                type="email"
                name="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="px-4 block w-full border-black border-[1.5px] border-solid bg-gray-100 focus:outline-none rounded-xl h-[2.5rem]"
              />
              {errors.forgotPassword && (
                <p className="text-red-500 text-center mt-2">
                  {errors.forgotPassword}
                </p>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignInPage;
