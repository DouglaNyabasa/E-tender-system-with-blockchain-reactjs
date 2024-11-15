import React from 'react';
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProcurementOfficer = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState('');
  const [dob, setDob] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const firestore = getFirestore();

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, "defaultPassword123"); // Replace with a secure password or prompt for it
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: "Procurement Officer",
        gender: gender,
        dob: dob,
        createdAt: new Date(),
      });

      toast.success("User has been added successfully!");
      setFirstName('');
      setLastName('');
      setEmail('');
      setGender('');
      setDob('');
    } catch (error) {
      console.error('There was a problem with the operation:', error);
      toast.error("There was a problem with adding the user: " + error.message);
    }
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
            value="Procurement Officer"
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