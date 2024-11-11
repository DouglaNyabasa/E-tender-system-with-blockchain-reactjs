import React from 'react'
import { getCookie } from '../../data';

const SupplierViewAllTenders = () => {
  const [tenders,setTenders] = React.useState([]);

  React.useEffect(()=>{
<<<<<<< HEAD
    fetch(import.meta.env.VITE_API_URL+"/suppliers",{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+getCookie("token")
      }
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Error occured")
      }
      return response.json()
    }).then((data)=>{
      setTenders(data.data);
    })
=======
    fetch(import.meta.env.VITE_API_URL+"/suppliers")
>>>>>>> 7bf546004758d160799085e3a54cdac51480e247
  })
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Tender List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tender ID</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Bidding Price</th>
            <th className="border border-gray-300 p-2">Expiry Date</th>
            <th className="border border-gray-300 p-2">Created At</th>
            <th className="border border-gray-300 p-2">Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {tenders.length > 0 ? (
            tenders.map((tender, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{tender.id}</td>
                <td className="border border-gray-300 p-2">{tender.title}</td>
                <td className="border border-gray-300 p-2">{tender.bid_price}</td>
                <td className="border border-gray-300 p-2">{tender.expiry_date}</td>
                <td className="border border-gray-300 p-2">{tender.created_at}</td>
                <td className="border border-gray-300 p-2">{tender.status ===1?"Approved":'Not Approved'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border border-gray-300 p-2 text-center">No tenders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierViewAllTenders
