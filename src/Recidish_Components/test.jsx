import { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    details: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file && file.size <= 3145728) {
        // 3MB in bytes
        setFormData({ ...formData, [e.target.name]: file });
      } else {
        alert("Image size should be less than 3MB");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const errors = {};
    if (!formData.category) errors.category = "Category is required";
    if (!formData.title) errors.title = "Title is required";
    if (!formData.details)
      errors.details = "Ingredients and steps are required";
    if (!formData.image) errors.image = "Image is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle form submission logic here, e.g., send data to an API
      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("details", formData.details);
      formDataToSend.append("image", formData.image);

      // Send formDataToSend to your API
      console.log(formDataToSend); // For demonstration
    }
  };

  const isFormValid = () => {
    return Object.keys(formErrors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category:</label>
        <div>
          <input
            type="radio"
            name="category"
            value="rice"
            checked={formData.category === "rice"}
            onChange={handleChange}
          />
          <label>Rice</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            value="soup"
            checked={formData.category === "soup"}
            onChange={handleChange}
          />
          <label>Soup</label>
        </div>
        <div>
          <input
            type="radio"
            name="category"
            value="spags"
            checked={formData.category === "spags"}
            onChange={handleChange}
          />
          <label>Spags</label>
        </div>
        {formErrors.category && (
          <span className="error">{formErrors.category}</span>
        )}
      </div>
      <div>
        <label>Recipe Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {formErrors.title && <span className="error">{formErrors.title}</span>}
      </div>
      <div>
        <label>Ingredients and Steps:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
        />
        {formErrors.details && (
          <span className="error">{formErrors.details}</span>
        )}
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange} />
        {formErrors.image && <span className="error">{formErrors.image}</span>}
      </div>
      <button type="submit" disabled={!isFormValid()}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
