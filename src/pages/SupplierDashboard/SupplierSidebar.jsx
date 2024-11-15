import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Route, Routes } from 'react-router-dom'
import ApplyTender from './ApplyTender'
import SupplierMyTenders from './SupplierMyTenders'
import SupplierViewAllTenders from './SupplierViewAllTenders'
import SupplierNavbar from './SupplierNavbar'


const SupplierSidebar = () => {
  return (
    <div>
         <ToastContainer />
      <SupplierNavbar />
     
      <div className="flex items-start ">
        {/* <Sidebar/> */}
        <Routes>
          <Route path="/" element={<></>}/>
          
          <Route path="/supplierDashboard/applyTender" element={<ApplyTender/>}/>
          <Route path="/supplierDashboard/supplierMyTender" element={<SupplierMyTenders/>}/>
          <Route path="/supplierDashboard/supplierViewAllTenders" element={<SupplierViewAllTenders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default SupplierSidebar
