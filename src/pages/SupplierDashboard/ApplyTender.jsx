import React from 'react'
import { getCookie } from '../../data';

const ApplyTender = () => {
  const [tenders, setTenders] = React.useState([]);

  React.useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/suppliers/tenders", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + getCookie("token")
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred");
      }
      return response.json();
    }).then((data)=>{
      setTenders(data.data);
    })
  })
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Tender</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block mb-2">Tender ID</label>
          <input
            type="number"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Tender</button>
      </form>
    </div>
  );
};
export default ApplyTender
