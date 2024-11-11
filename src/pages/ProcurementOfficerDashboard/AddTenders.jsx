import React, { useState, useEffect } from 'react'
import { getCookie } from '../../data';

const AddTenders = () => {
  const [title, setTitle] = useState('');
  const [minPrice, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [expiryTime, setExpiryTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL + "/tenders", {
      method: "PUT",
      headers: {
        "Authorization": getCookie("token")
      },
      body: {
        name: title,
        description: description,
        bid_price: minPrice,
        expiryData: expiryTime
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Error occurred")
      } return response.json()
    }).then((data) => {
      if (data.data === "ok") {
        // Reset form fields
        setTitle("");
        setPrice("");
        setDescription("");
        setExpiryTime("");
      } else {
        alert("Something went wrong")
      }
    })

  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Tender</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Minimum Price</label>
          <input
            type="text"
            value={minPrice}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiry Date</label>
          <input
            type="text"
            value={expiryTime}
            onChange={(e) => setExpiryTime(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Tender</button>
      </form>
    </div>
  );
};

export default AddTenders
