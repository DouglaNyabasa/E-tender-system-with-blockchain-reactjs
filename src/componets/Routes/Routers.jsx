



import {Routes,Route} from 'react-router-dom'

import Welcome from '../Welcome/Welcome'
import Login from '../Authentication/Login'

import AddProcurementOfficer from '../../pages/AdminDashboard/Pages/AddProcurementOfficer'
import AdminDashboard from '../../pages/AdminDashboard/AdminDashboard'
import ViewGrantedTender from '../../pages/AdminDashboard/Pages/ViewGrantedTender'
import ViewSuppliers from '../../pages/AdminDashboard/Pages/ViewSuppliers'

import AddTenders from '../../pages/ProcurementOfficerDashboard/AddTenders'
import ApprovedTenders from '../../pages/ProcurementOfficerDashboard/ApprovedTenders'
import OfficerDashboard from '../../pages/ProcurementOfficerDashboard/OfficerDashboard'
import OfficerViewAllBiddings from '../../pages/ProcurementOfficerDashboard/OfficerViewAllBiddings'
// import OfficerViewAllTenders from '../../pages/ProcurementOfficerDashboard/OfficerViewAllTenders'
import ApplyTender from '../../pages/SupplierDashboard/ApplyTender'
import SupplierDashboard from '../../pages/SupplierDashboard/SupplierDashboard'
import SupplierViewAllTenders from '../../pages/SupplierDashboard/SupplierViewAllTenders'

import RegisterSupplier from '../Authentication/RegisterSupplier'

import SignupAdmin from '../Authentication/SignupAdmin'
import Dashboard from '../Dashboard/Dashboard'
import SupplierMyTenders from '../../pages/SupplierDashboard/SupplierMyTenders'






const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome/>} />
      <Route path='/home' element={<Welcome/>} />
      <Route path='/login' element={<Login/>} />
    

      <Route path='/adminDashboard' element={<AdminDashboard/>} >
        <Route path='addProcurementOfficer' element={<AddProcurementOfficer/>} />
        <Route path='addTender' element={<AddTenders/>} />
        <Route path='viewGrantedTender' element={<ViewGrantedTender/>} />
      </Route>

      <Route path='/officerDashboard' element={<OfficerDashboard/>} >
        <Route path='addTender' element={<AddTenders/>} />
        <Route path='approvedTenders' element={<ApprovedTenders/>} />
        <Route path='officerViewAllBiddings' element={<OfficerViewAllBiddings/>} />
      </Route>

      <Route path='/supplierDashboard' element={<SupplierDashboard/>} >
        <Route path='supplierViewAllTenders' element={<SupplierViewAllTenders/>} />
        <Route path='applyTender' element={<ApplyTender/>} />
        <Route path='supplierMyTender' element={<SupplierMyTenders/>}/>
      </Route>
      
      
      
      
      {/* <Route path='/officerViewAllTenders' element={<OfficerViewAllTenders/>} /> */}
      <Route path='/adminRegister' element={<SignupAdmin/>} />
      {/* <Route path='/viewBiddings' element={<ViewBiddings/>} /> */}
      
      <Route path='/viewSuppliers' element={<ViewSuppliers/>} />
      <Route path='/supplierRegister' element={<RegisterSupplier/>} />





 
    </Routes>
  )
}

export default Routers

