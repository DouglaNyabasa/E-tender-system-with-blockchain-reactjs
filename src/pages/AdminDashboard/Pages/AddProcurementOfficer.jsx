import React from 'react';
import { getCookie } from '../../../data';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const AddProcurementOfficer = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState("");
  const [role, setRoles] = React.useState('Procurement Officer'); // Default role
  const [gender, setGender] = React.useState('');
  const [dob, setDob] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL + "/officer/adduser", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ` + getCookie("token"),
        "Content-Type": "application/json", // Ensure you're sending JSON
      },
      body: JSON.stringify({ // Convert body to JSON string
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender,
        email: email
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      if (data.data) {
        toast.success("User has been added successfully!"); // Success message
        setFirstName('');
        setLastName('');
        setEmail('');
        setGender('');
        setDob('');
      } else {
        toast.error("Failed to add user."); // Error message if user not added
      }
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      toast.error("There was a problem with adding the user."); // Error message for catch
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <h2 className="text-2xl font-bold mb-4">Procurement Officer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="border rounded w-full p-2 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border rounded w-full p-2"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Add User</button>
      </form>
    </div>
  );
};

export default AddProcurementOfficer;
