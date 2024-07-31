import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const Payment = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setMessage("");

    try {
      const response = await fetch(
        "https://recidishbackend.onrender.com/api/payment/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            amount: 200,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setMessage(data.message);
      setIsError(false);
      console.log(data);
      console.log(data.data.reference);
      localStorage.setItem("reference", data.data.reference);
      localStorage.setItem("paystack", data.data.authorization_url);

      window.open(`${data.data.authorization_url}`, "_blank");

      setTimeout(() => {
        navigate("/verify");
      }, 4000);
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("An error occurred. Please try again later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-3xl font-bold mb-6 text-center text-teal-600">
          Payment Form
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Amount to be Paid
            </label>
            <input
              type="text"
              id="amount"
              value="₦200"
              className="w-full px-4 py-3 border rounded-lg bg-gray-200 cursor-not-allowed"
              readOnly
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Initializing..." : "Initialize Payment"}
          </button>
          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              } flex items-center`}
            >
              {isError ? (
                <FaExclamationCircle className="mr-2 text-xl" />
              ) : (
                <FaCheckCircle className="mr-2 text-xl" />
              )}
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Payment;
