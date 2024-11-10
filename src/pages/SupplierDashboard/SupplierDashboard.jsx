import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const SupplierDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Supplier Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link to="/supplierViewAllTenders" className="text-blue-500 hover:underline">View All Tenders</Link>
              </li>
              <li>
                <Link to="/applyTender" className="text-blue-500 hover:underline">Apply Tender</Link>
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
