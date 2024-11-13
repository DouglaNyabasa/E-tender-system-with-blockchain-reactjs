import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const OfficerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-all duration-300 ease-in-out">
      {/* <header className="bg-blue-700 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Procurement Officer Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className="text-white hover:underline">Home</NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="text-white hover:underline">Logout</NavLink>
            </li>
          </ul>
        </nav>
      </header> */}
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4 transition-transform duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <nav>
            <ul className="space-y-3">
              <li>
                <NavLink to="/officerDashboard/addTender"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && " bg-blue-100 border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>Add Tenders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/officerDashboard/approvedTenders"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && " bg-blue-100 border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>Approved Tenders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/officerDashboard/officerViewAllBiddings"
                  className={(active) => `flex items-center no-underline gap-3 text-blue-600 hover:bg-blue-100 rounded px-3 py-1 transition duration-200 ${active.isActive && " bg-blue-100 border-r-4 border-primary"}`}>
                  <p className={`text-blue-500 font-bold`}>View All Biddings</p>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-50 transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficerDashboard
