import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const SupplierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Supplier Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink to="/supplierDashboard/supplierViewAllTenders"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-[#F2F3FF] border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>View All Tenders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/supplierDashboard/supplierMyTender"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-[#F2F3FF] border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>View My Tenders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/supplierDashboard/applyTender"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && "bg-[#F2F3FF] border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>Apply Tender</p>
                </NavLink>
              </li>
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

export default SupplierDashboard
