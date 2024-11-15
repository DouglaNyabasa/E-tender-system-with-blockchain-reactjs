import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/admin/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "Registration failed!");
        return;
      }

      const data = await response.json();
      if (data.u_token) {
        Cookies.set('token', data.u_token, { expires: 30, path: '' });
        toast.success("Successfully registered!");
        navigate("/adminDashboard");
      } else {
        toast.error(data.msg || "Registration failed!");
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("There was a problem with the registration.");
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Create <span className="text-primaryColor">Admin</span> Account
        </h3>

        <form onSubmit={handleSubmit} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              required
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
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
              value={formData.password}
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
      <ToastContainer /> {/* ToastContainer for notifications */}
    </section>
  );
};

export default SignupAdmin;
