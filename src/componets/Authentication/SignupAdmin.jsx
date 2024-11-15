import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // Reset error state on change
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error states
    setErrors({ email: false, password: false });

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Both fields are required.");
      if (!formData.email) setErrors(prev => ({ ...prev, email: true }));
      if (!formData.password) setErrors(prev => ({ ...prev, password: true }));
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setErrors(prev => ({ ...prev, password: true }));
      return;
    }

    const auth = getAuth(); // Initialize Firebase Authentication

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Successfully registered
      toast.success("Successfully registered!");
      navigate("/adminDashboard");
    } catch (error) {
      const errorMessage = error.message;
      console.error('Registration error:', errorMessage);
      toast.error("Registration failed: " + errorMessage);
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
              className={`border ${errors.email ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
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
              className={`border ${errors.password ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
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
      <ToastContainer />
    </section>
  );
};

export default SignupAdmin;