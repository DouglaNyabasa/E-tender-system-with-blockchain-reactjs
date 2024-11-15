
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import TopBar from "../Topbar/TopBar";
import { useEffect } from "react";
import { getCookie } from "../../data";



const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-600 text-sm font-semibold text-black";


const Welcome = () => {
  
  // useEffect(()=>{
  //    if(!getCookie("token")){
  //     window.location.href= "/login";
  //    }else{
  //     window.location.href = "/supplierDashboard/supplierViewAllTenders";
  //    }
  // })

  return (
    
    <div className="flex w-full justify-center items-center">
      
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="font-bold  text-3xl sm:text-5xl text-black text-gradient py-1">
            E-Tender <br /> with Blockchain Transactions
          </h1>
          <p className="text__para font-bold text-left mt-5 text-black md:w-9/12 w-11/12 text-base">
            A Digital way of Buying and selling of Tenders through the use of blockchain Technologies.
          </p>
          
            <button
              type="button"
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-black text-base font-semibold">
                Trade
              </p>
            </button>
          
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Welcome;
