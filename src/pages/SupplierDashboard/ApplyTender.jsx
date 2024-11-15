import React from 'react'
import { getCookie } from '../../data';
import { useLocation } from 'react-router-dom';

const ApplyTender = () => {
  const [title, setTitle] = React.useState("");
  const [tender, setTenders] = React.useState("");
  const [description, setDescription] = React.useState("");
  const getParams = useLocation().search;
  const tenderId = new URLSearchParams(getParams).get("tenderId");

  React.useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/tenders/"+tenderId, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + getCookie("token"),

      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred");
      }
      return response.json();
    }).then((data) => {
      setDescription(data.data.description);
      setTitle(data.data.name);
    })
  });

  const handleSubmit = ()=>{
    fetch(import.meta.env.VITE_API_URL + "/tender/bid/add", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + getCookie("token")
      },
      body:{
        tenderId:tenderId,
        title:title,
        amount:amount
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred");
      }
      return response.json();
    }).then((data) => {
      setTenders(data.data);
    })
  }
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Tender</h2>
      <div className="mb-4">
        <label className="block mb-2">{title}</label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <p className="p-2">{description}</p>
      </div>
      <form onSubmit={handleSubmit}>
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
