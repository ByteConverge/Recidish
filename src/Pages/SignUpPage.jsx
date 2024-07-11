/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signInImg from "../Recidish_Images/sign-in-bgImage.svg";
import googleImg from "../Recidish_Images/googleLogo.svg";
import facebookImg from "../Recidish_Images/fb-sign.svg";
import React from "react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
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

    if (!validateEmail(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }

    if (!validatePassword(formData.password)) {
      tempErrors.password =
        "Password must be 6-10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

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

    if (name === "password" && !validatePassword(value)) {
      tempErrors.password =
        "Password must be 6-10 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
      delete tempErrors.password;
    }

    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
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
    if (!validateEmail(email)) {
      return;
    }
    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      setFormData((prevData) => ({
        ...prevData,
        confirmPassword: "",
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "",
      }));
    }

    setDisable(false);

    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://recidishbackend.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        setIsLoading(false);

        if (response.ok) {
          setIsSubmitted(true);
          setIsModalOpen(true);
          window.localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            navigate("/loggedInHome");
          }, 3000);
        } else {
          setErrors({ api: "User with Email already exist" });
          setTimeout(() => {
            setErrors({ api: "" });
          }, 6000);
          console.log(response);
        
        }

       const data = await response.json() ;

       console.log(data);

      } catch (error) {
        setIsLoading(false);
        setErrors({ api: "failed to signup " });
        console.log(error);
        
      }
    }
  };

  return (
    // Background Overall
    <div
      id="backgroundOverall"
      className={` w-[100%] min-h-[100vh] sm:bg-cover sm:bg-no-repeat sm:grid sm:place-items-center `}
      style={{ backgroundImage: `url(${signInImg})` }}
    >
      {/* form wrapper black--cover*/}
      <div
        id="form wrapper"
        className="w-[100%] min-h-[100vh] bg-black bg-opacity-50 flex flex-col sm:w-[50%] sm:h-[80vh] sm:rounded-[2rem] "
      >
        {/* Form section */}
        <form
          id="form section"
          className="text-white flex flex-col justify-start gap-2 px-5 py-7 items-center h-[100%] sm:h-[90%] sm:w-[70%] sm:justify-start sm:gap-0 sm:mt-2 sm:mx-auto sm:py-0"
          onSubmit={handleSubmit}
        >
          {/* h1{sign Up} */}
          <h1 className="text-[1.4rem]  w-[100%]  flex flex-col justify-en  sm:mb-2">
            Sign Up
          </h1>
          {/* form content */}
          <div
            id="form-content"
            className=" w-[100%] h-[90%] flex flex-col gap-1 sm:gap-0  "
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

            {/* check */}

            {/*Name Email Password div  */}
            <div
              id="NameEmailPassword"
              className="flex flex-col gap-1 mb-4 sm:gap-0"
            >
              {/* Name */}
              <div id="name--field" className="mb-2 sm:mb-1">
                <label htmlFor="email" className="">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 block w-full border-white border-[1.5px] border-solid bg-black bg-opacity-50 focus:outline-none focus:border-white rounded-xl h-[2.5rem] sm:h-[1.7rem]"
                />
              </div>
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
                {errors.email && (
                  <span className=" pl-4 mt-2 text-red-500 text-[11px] block bg-black ">
                    {errors.email}
                  </span>
                )}
              </div>
              {/* password */}
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
                {errors.password && (
                  <span className="text-red-500 text-[11px] block bg-black mt-2">
                    {errors.password}
                  </span>
                )}
              </div>
              {/* password confirm */}
              <div className="mb-2 sm:mb-1">
                <label htmlFor="confirmPassword" className="">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 block w-full border-white border-[1.5px] border-solid bg-black bg-opacity-50 focus:outline-none focus:border-white rounded-xl h-[2.5rem] sm:h-[1.7rem]"
                />
                {errors.confirmPassword && (
                  <span className=" pl-4 mt-2 text-red-500 text-[11px] block bg-black">
                    {errors.confirmPassword}
                  </span>
                )}
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
            {/* Sign Up button */}
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
                  "Sign Up"
                )}
              </button>
              {/*  */}
              <p className="w-full">
                Have an account? <Link to="/signIn">Sign In</Link>
              </p>
            </div>
            {/* Or */}
            <div className="flex gap-1 justify-center items-center my-2">
              <span className="w-full h-[1px] bg-white"></span> OR
              <span className="w-full h-[1px] bg-white"></span>
            </div>
            {/*social-media-signin  */}
            <div id="SocialMediaSignings" className="flex flex-col gap-3">
              {/* google signing */}
              <a
                id="google-signin"
                href="#"
                className=" flex bg-white text-black justify-center gap-1 p-1 rounded-3xl"
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
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-white p-6 rounded">
            <h2 className="text-2xl mb-4 text-center text-green-400">
              Success!
            </h2>
            <p>You have signed up successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
