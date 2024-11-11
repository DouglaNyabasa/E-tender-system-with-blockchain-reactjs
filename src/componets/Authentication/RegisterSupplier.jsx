import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyLogo from '../../assets/flutterwave.jpg'



const RegisterSupplier = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    password: "",
    photo: selectedFile,
    phoneNumber: "",

  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const submitHandler = async (event) => {
    event.preventDetail();
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-6">
          Create a <span className="text-primaryColor">Supplier</span>{" "}Account
        </h3>

        <form action="" className="py-4 md:py-0">
        <div className="mb-5">
                <input
                  className="border border-zinc-300  rounded w-full p-2 mt-1"
                  required
                  type="text"
                  placeholder="Company name"
                  name="company Name"
                  value={FormData.fullName}
                  onChange={handleInputChange}
                />
              </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={FormData.companyAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder="Company Email"
              name="companyEmail"
              value={FormData.companyEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="text"
              placeholder=" Phone Number"
              name="companyAddress"
              value={FormData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <input
              className="border border-zinc-300  rounded w-full p-2 mt-1"
              required
              type="password"
              placeholder="Password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="mb-5 flex items-center gap-3">
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img src={companyLogo} alt="" className="w-full rounded-full" />
                </figure>

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                  />

                  <label htmlFor="customFile" className="absolute top-0 left-0 w-full h-full flex items-center px-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer">
                    Upload Photo</label>
                </div>
              </div> */}

          <div className="mt-7">
            <button
           onClick={()=> navigate('supplierDashboard')}
              type="submit"
              className="w-full bg-primaryColor px-4 py-3 rounded-lg text-white text-[18px] leading-[30px]"
            >
              Register
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor font-medium ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterSupplier;
