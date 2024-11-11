import React,{ useState} from 'react'
import { getCookie } from '../../../data';

const ViewGrantedTender = ({ acceptedTenders }) => {

  const [acceptedTenders,setAcceptedTenders] = useState([]);

  

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
      setAcceptedTenders(data.data);
    });
  })
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Accepted Tenders</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tender ID</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Bidding Price</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {acceptedTenders.length > 0 ? (
            acceptedTenders.map((tender, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{tender.id}</td>
                <td className="border border-gray-300 p-2">{tender.companyName}</td>
                <td className="border border-gray-300 p-2">{tender.supplierName}</td>
                <td className="border border-gray-300 p-2">{tender.biddingPrice}</td>
                <td className="border border-gray-300 p-2">{tender.time}</td>
                <td className="border border-gray-300 p-2">Accepted</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border border-gray-300 p-2 text-center">No accepted tenders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewGrantedTender
