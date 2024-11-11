import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = ()=>{
  fetch(import.meta.env.VITE_API_URL+"/login",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'  // Tell the server that we're sending JSON data
    },
    body: JSON.stringify(formData)
  }).then((response)=>{
   if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  }).then(data => {
    if(data.u_token){
      const date = new Date();
      date.setTime(date.getTime() + (31 * 24 * 60 * 60 * 1000));  // Set expiration date
      const expires = "expires=" + date.toUTCString();
      document.cookie = `token=${data.u_token}; ${expires}; path=/`;  // Set cookie
      window.location.href = "/"
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello <span className="text-primaryColor ">Welcome</span> Back
        </h3>

        <form onSubmit={handleSubmit} className="py-4 md:py-0">
          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={FormData.email}
              onChange={handleInputChange}
            />
          </div>
     
         
          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
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
