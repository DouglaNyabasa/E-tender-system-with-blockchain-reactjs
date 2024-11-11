import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white border border-r">
      {
        <ul className="text-[#515151] mt-5">
             <NavLink  className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p>Dashboard</p>
            </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/addProcurementOfficer"}
          >
            <img src={assets.people_icon} alt="" />
            <p>Add Procurement Officer</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/addTender"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Tenders</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/viewGrantedTender"}
          >
            <img src={assets.tick_icon} alt="" />
            <p>View All Tenders</p>
          </NavLink>

     


        </ul>
      }
    </div>
  );
};

export default AdminDashboard;
