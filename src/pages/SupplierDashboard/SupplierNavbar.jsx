import React, { useContext } from "react";

import { assets } from "../../assets/assets_frontend/assets";
import {useNavigate} from 'react-router-dom'


const SupplierNavbar = () => {

  const navigate =  useNavigate()

  const logout =()=>{
    navigate('/login')
 
     localStorage.removeItem('aToken')
  }
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border bg-white border-b ">
      <div className="flex items-center gap-2 text-xs ">
        <img
          src={assets.logo1}
          alt=""
          className="w-36 sm:w-40 cursor-pointer "
        />
        <p className="border px-2.5 py-0.5 rounded-full text-gray-600 border-gray-500  ">
        Supplier
        </p>
      </div>
      <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default SupplierNavbar;
