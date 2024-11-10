import React from 'react'

const AddProcurementOfficer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [role] = useState('Procurement Officer'); // Default role
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  function getCookie(name) {
    const nameEq = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEq) === 0) {
        return c.substring(nameEq.length, c.length);
      }
    }
    return null; // If cookie doesn't exist
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL+"/officer/adduser",{
      method:"POST",
      headers:{
        "Authorization":`Bearer `+getCookie("token")
      },
      body:{
        firstName:firstName,
        lastName:lastName,
        dob:dob,
        gender:gender,
        email:email
      }
    }).then((response)=>{
      iif (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    }).then((data)=>{
      if(data.data){
        alert("User has been added");
      }
    })
    setFirstName('');
    setLastName('');
    setId('');
    setGender('');
    setDob('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
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

export default AddProcurementOfficer
