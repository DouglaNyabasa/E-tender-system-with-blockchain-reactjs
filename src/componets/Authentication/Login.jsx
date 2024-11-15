import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { loginUser } from './authService';




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          await loginUser(email, password);
          toast.success("Login successful!");
          navigate('/dashboard'); // Redirect to dashboard after successful login
      } catch (error) {
          toast.error(error.message);
      }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor ">Welcome</span> Back
        </h3>

        <form onSubmit={handleLogin} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              className="w-full py-3 border-b border=[#0066ff51] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              required
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <input
              className="w-full py-3 border-b border-red-800 focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor px-4 py-3 rounded-lg text-white text-[18px] leading-[30px]"
            >
              Login
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
