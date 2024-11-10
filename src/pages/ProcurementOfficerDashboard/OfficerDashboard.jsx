import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const OfficerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col transition-all duration-300 ease-in-out">
      <header className="bg-blue-700 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">Procurement Officer Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-white hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/logout" className="text-white hover:underline">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4 transition-transform duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link to="/officer-dashboard/add-tender" className="text-blue-600 hover:bg-blue-100 rounded px-2 py-1 transition duration-200">Add Tenders</Link>
              </li>
              <li>
                <Link to="/officer-dashboard/approved-tenders" className="text-blue-600 hover:bg-blue-100 rounded px-2 py-1 transition duration-200">Approved Tenders</Link>
              </li>
              <li>
                <Link to="/officer-dashboard/view-biddings" className="text-blue-600 hover:bg-blue-100 rounded px-2 py-1 transition duration-200">View All Biddings</Link>
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
