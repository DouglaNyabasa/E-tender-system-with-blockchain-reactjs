import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterSupplier = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    companyAddress: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    companyName: false,
    companyAddress: false,
    password: false,
    phoneNumber: false,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setErrors({
      email: false,
      companyName: false,
      companyAddress: false,
      password: false,
      phoneNumber: false,
    });

    if (!formData.email || !formData.companyName || !formData.companyAddress || !formData.password || !formData.phoneNumber) {
      toast.error("All fields are required.");
      if (!formData.email) setErrors(prev => ({ ...prev, email: true }));
      if (!formData.companyName) setErrors(prev => ({ ...prev, companyName: true }));
      if (!formData.companyAddress) setErrors(prev => ({ ...prev, companyAddress: true }));
      if (!formData.password) setErrors(prev => ({ ...prev, password: true }));
      if (!formData.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: true }));
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number (10 digits).");
      setErrors(prev => ({ ...prev, phoneNumber: true }));
      return;
    }

    const auth = getAuth(); // Initialize Firebase Authentication

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // User registration successful
      const user = userCredential.user;

      // Here you can store additional user info (like companyName, companyAddress, phoneNumber)
      // You might want to save this data to your database (e.g., Firestore)

      toast.success("Registration successful!");
      navigate("/supplierDashboard"); // Navigate after success
    } catch (error) {
      const errorMessage = error.message;
      console.error('Registration error:', errorMessage);
      toast.error("Registration failed: " + errorMessage);
    }
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
              className={`border ${errors.email ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className={`border ${errors.companyName ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
              required
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className={`border ${errors.companyAddress ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
              required
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className={`border ${errors.phoneNumber ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
              required
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
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

export default RegisterSupplier;
