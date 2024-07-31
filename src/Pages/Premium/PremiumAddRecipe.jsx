/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCamera } from "react-icons/ai";

const PremiumAddRecipe = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    ingredients: "",
    text: "",
    tips: "",
    img: null,
  });

  const jwt = localStorage.getItem("token");

  const [formErrors, setFormErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    if (name === "category" && !value) error = "Category is required";
    if (name === "title" && !value) error = "Title is required";
    if (name === "ingredients" && !value) error = "Ingredients are required";
    if (name === "text" && !value) error = "Steps are required";
    if (name === "img" && !value) error = "Image is required";
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "img" ? files[0] : value;

    // Validate field
    const error = validateField(name, newValue);

    // Update form data and errors
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAttemptedSubmit(true);

    // Validate all fields before submission
    const errors = {};
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("ingredients", formData.ingredients);
      formDataToSend.append("text", formData.text);
      formDataToSend.append("tips", formData.tips);
      if (formData.img) {
        formDataToSend.append("img", formData.img);
      }

      // Log form data for debugging
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      try {
        const response = await fetch(
          "https://recidishbackend.onrender.com/api/premium/premiumAdd",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: formDataToSend,
          }
        );

        if (response.ok) {
          console.log("Recipe submitted successfully");
          setFormErrors({});
          setAttemptedSubmit(false);
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate("/loggedIn/recipes");
          }, 3000); // Hide modal and redirect after 3 seconds
        } else {
          console.error("Error submitting recipe");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[93%] mx-auto md:w-[90%]"
      >
        <h1 className="text-2xl font-bold text-center">Add Recipe</h1>
        {attemptedSubmit && Object.keys(formErrors).length > 0 && (
          <p className="text-red-500 text-center text-sm rounded">
            All fields must be filled
          </p>
        )}

        {/* Form input fields */}
        <div className="flex flex-col gap-2 w-[100%]">
          <div className="flex gap-3 w-full justify-center">
            <label className="h-[2rem] flex items-center gap-1">
              <input
                type="radio"
                name="category"
                value="rice"
                checked={formData.category === "rice"}
                onChange={handleChange}
                className="form-radio text-[#b0906e] self-center"
              />
              <p className="self-center">Rice</p>
            </label>
            <label className="flex items-center gap-1 h-[2rem]">
              <input
                type="radio"
                name="category"
                value="soup"
                checked={formData.category === "soup"}
                onChange={handleChange}
                className="form-radio text-[#b0906e]"
              />
              <p className="self-center">Soup</p>
            </label>
            <label className="flex items-center gap-1 h-[2rem]">
              <input
                type="radio"
                name="category"
                value="stew"
                checked={formData.category === "stew"}
                onChange={handleChange}
                className="form-radio text-[#b0906e]"
              />
              <p className="self-center">Stew</p>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-poppins font-medium">Name of Dish:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border rounded-lg bg-white border-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-poppins font-medium">Ingredients:</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="p-2 border border-black rounded-lg bg-white focus:outline-none focus:border-black h-[3rem]"
              rows="3"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-poppins font-medium">Steps:</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="p-2 border border-black rounded-lg bg-white focus:outline-none focus:border-black"
              rows="5"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-poppins font-medium">Tips:</label>
            <textarea
              name="tips"
              value={formData.tips}
              onChange={handleChange}
              className="p-2 border border-black rounded-lg bg-white focus:outline-none focus:border-black"
              rows="3"
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg bg-[#DEAA72] focus:outline-none focus:border-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-[60%] mx-auto mt-2 py-2 px-4 rounded-lg text-white ${
            loading
              ? "bg-[#996D3E] cursor-not-allowed"
              : "bg-[#996D3E] hover:bg-[#a07956]"
          }`}
          disabled={loading || Object.keys(formErrors).length > 0}
        >
          {loading ? "Submitting..." : "Add Recipe"}
        </button>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-xs mx-auto">
            <div className="flex justify-center mb-4">
              <AiOutlineCheckCircle className="text-green-500 text-[2rem]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p>Your recipe has been uploaded</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumAddRecipe;
