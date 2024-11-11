import React from 'react'
import { getCookie } from '../../../data';

const ViewSuppliers = () => {
  const [users,setUsers] = React.useState([]);

  React.useEffect(()=>{
    fetch(import.meta.env.VITE_API_URL+"/tenders",{
      method:"GET",
      header:{
        "Authorization":"Bearer "+getCookie(token)
      }
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Error occured");
      }
      return response.json();
    }).then((data)=>{
      setUsers(data.data);
    });
  })
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">View All Suppliers</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
          <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Gender</th>
            <th className="border border-gray-300 p-2">DOB</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                  <td className="border border-gray-300 p-2">{user.id}</td>
                <td className="border border-gray-300 p-2">{user.firstName}</td>
                <td className="border border-gray-300 p-2">{user.lastName}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">{user.gender}</td>
                <td className="border border-gray-300 p-2">{user.dob}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 p-2 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default ViewSuppliers
