import React from 'react'

const OfficerViewAllBiddings = () => {
  const [tenders,setTenders] = React.useState([]);


  const onAcceptTender = ()=>{

  }
  const onRejectTender = () =>{

  }


  React.useEffect(()=>{
    fetch(import.meta.env.VITE_API_URL+"/tenders",{
      method:"POST",
      headers:{
        "Authorization": "Bearer "+getCookie("token")
      }
    }).then((response)=>{
      if(!response.ok){
        throw new Error("Error occured");
      }
      return response.json();
    }).then((data)=>{
      setTenders(data.data);
    })
  })
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Tender List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tender ID</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Bidding Price</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Approval Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.length > 0 ? (
            tenders.map((tender, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{tender.id}</td>
                <td className="border border-gray-300 p-2">{tender.supplierName}</td>
                <td className="border border-gray-300 p-2">{tender.biddingPrice}</td>
                <td className="border border-gray-300 p-2">{tender.time}</td>
                <td className="border border-gray-300 p-2">{tender.isApproved ? 'Approved' : 'Not Approved'}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => onAcceptTender(index)}
                    className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onRejectTender(index)}
                    className="bg-red-500 text-white rounded px-2 py-1"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="border border-gray-300 p-2 text-center">No tenders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OfficerViewAllBiddings
