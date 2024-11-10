import React from 'react'

const AddTenders = ({ onAddTender }) => {
  const [id, setId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [notificationId, setNotificationId] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [biddingPrice, setBiddingPrice] = useState('');
  const [time, setTime] = useState('');
  const [isApproved, setIsApproved] = useState(false); // New state for approval status

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTender({ id, companyName, notificationId, itemId, itemName, biddingPrice, time, isApproved });
    // Reset form fields
    setId('');
    setCompanyName('');
    setNotificationId('');
    setItemId('');
    setItemName('');
    setBiddingPrice('');
    setTime('');
    setIsApproved(false); // Reset approval status
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Tender</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Tender ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Notification ID</label>
          <input
            type="text"
            value={notificationId}
            onChange={(e) => setNotificationId(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Item ID</label>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bidding Price</label>
          <input
            type="number"
            value={biddingPrice}
            onChange={(e) => setBiddingPrice(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isApproved}
              onChange={() => setIsApproved(!isApproved)}
              className="mr-2"
            />
            Approved
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Add Tender</button>
      </form>
    </div>
  );
};

export default AddTenders
