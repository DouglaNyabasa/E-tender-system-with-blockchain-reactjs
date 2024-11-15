import React, { useEffect, useState } from "react";
import { db } from "../../../componets/Authentication/firebase"; // Adjust the path as necessary
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

const ViewSuppliers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const officersCollection = collection(db, "users"); // Adjust this to your collection name
        const officerSnapshot = await getDocs(officersCollection);
        const officerList = officerSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOfficers(officerList);
      } catch (error) {
        console.error("Error fetching officers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  if (loading) {
    return <div className="p-4">Loading officers...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Procurement Officers</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Gender</th>
            <th className="border border-gray-300 p-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {officers.length > 0 ? (
            officers.map(officer => (
              <tr key={officer.id}>
                <td className="border border-gray-300 p-2">{officer.firstName}</td>
                <td className="border border-gray-300 p-2">{officer.lastName}</td>
                <td className="border border-gray-300 p-2">{officer.email}</td>
                <td className="border border-gray-300 p-2">{officer.role}</td>
                <td className="border border-gray-300 p-2">{officer.gender}</td>
                <td className="border border-gray-300 p-2">{officer.dob}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 p-2 text-center">
                No procurement officers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSuppliers;