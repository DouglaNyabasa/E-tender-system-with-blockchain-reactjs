import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const RegisterSupplier = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    companyAddress: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault(); // Corrected from preventDetail to preventDefault
    fetch(import.meta.env.VITE_API_URL + "/supplier/register", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ` + Cookies.get("token"),
        "Content-Type": "application/json", // Added Content-Type header
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.companyName,
        password: formData.password,
        phone: formData.phoneNumber,
        address: formData.companyAddress,
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      if (data.data) {
        Cookies.set('token', data.u_token, { expires: 30, path: '' });
        toast.success("Registration successful!"); // Show success message
        navigate("/supplierDashboard"); // Navigate after success
      } else {
        toast.error(data.msg || "Registration failed!"); // Show error message if no token
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("There was a problem with the registration."); // Show error message
    });
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-6">
          Create a <span className="text-primaryColor">Supplier</span>{" "}Account
        </h3>

        <form onSubmit={submitHandler} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder="Company Name"
              name="companyName" // Corrected name attribute
              value={formData.companyName} // Corrected to formData
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={formData.companyAddress} // Corrected to formData
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder="Phone Number"
              name="phoneNumber" // Corrected name attribute
              value={formData.phoneNumber} // Corrected to formData
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password} // Corrected to formData
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor px-4 py-3 rounded-lg text-white text-[18px] leading-[30px]"
            >
              Register
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor font-medium ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </section>
  );
};

export default RegisterSupplier;
