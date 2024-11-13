import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets_admin/assets";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white border border-r">
      <div className="flex flex-1">
        <aside className="w-68 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              <NavLink
                className={(active ) =>
                  `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-blue-100 border-r-4 border-primary"
                  }`
                }
                to={"/adminDashboard/addProcurementOfficer"}
              >
                <p className={`text-blue-500 font-bold`}>Add Procurement Officer</p>
              </NavLink>

              <NavLink
                className={(active ) =>
                  `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-blue-100 border-r-4 border-primary"
                  }`
                }
                to={"/adminDashboard/addTender"}
              >
                <p className={`text-blue-500 font-bold`}>Add Tenders</p>
              </NavLink>

              <NavLink
                className={(active ) =>
                  `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-blue-100 border-r-4 border-primary"
                  }`
                }
                to={"/adminDashboard/viewGrantedTender"}
              >
                <p className={`text-blue-500 font-bold`}>View All Tenders</p>
              </NavLink>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
