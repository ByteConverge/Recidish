import  { useState } from "react";

const VerifyPayment = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 let ref= localStorage.getItem("reference")
 let paystack= localStorage.getItem("paystack")
  console.log(ref);
  console.log(paystack);

  const handleVerifyPayment = () => {
    setLoading(true);
    setMessage("");

    fetch(
      `https://recidishbackend.onrender.com/api/payment/verify?reference=${ref}`,
      {
        method: "GET",
       
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.data.status === "success") {
          console.log(data);
          setMessage("Payment verified successfully!");
        } else if(data.data.status ==="abandoned") {
          setMessage("Payment verification failed. Please try again.");
          console.log(data);
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage("An error occurred. Please try again.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <a
          href={paystack}
          target="_blank"
          className=" underline w-[1rem] mt-[3rem]"
        >
          click to make payment
        </a>
        
        {/*  */}
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Verify Payment
        </h2>
        <button
          onClick={handleVerifyPayment}
          disabled={loading}
          className={`w-full py-2 px-4 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-semibold transition duration-300 ease-in-out`}
        >
          {loading ? "Verifying..." : "Verify Payment"}
        </button>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyPayment;
