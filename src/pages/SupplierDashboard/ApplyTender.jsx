import React from 'react'

const ApplyTender = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Available Tenders</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tender ID</th>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Notification ID</th>
            <th className="border border-gray-300 p-2">Item ID</th>
            <th className="border border-gray-300 p-2">Item Name</th>
            <th className="border border-gray-300 p-2">Bidding Price</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.length > 0 ? (
            tenders.map((tender, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{tender.id}</td>
                <td className="border border-gray-300 p-2">{tender.companyName}</td>
                <td className="border border-gray-300 p-2">{tender.notificationId}</td>
                <td className="border border-gray-300 p-2">{tender.itemId}</td>
                <td className="border border-gray-300 p-2">{tender.itemName}</td>
                <td className="border border-gray-300 p-2">{tender.biddingPrice}</td>
                <td className="border border-gray-300 p-2">{tender.time}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => onApplyTender(tender.id)}
                    className="bg-green-500 text-white rounded px-2 py-1"
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border border-gray-300 p-2 text-center">No tenders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ApplyTender
