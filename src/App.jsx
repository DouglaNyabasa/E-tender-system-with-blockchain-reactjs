import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './index.css'
import "./App.css";

import Layout from "./componets/layout/Layout";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <Layout/>
    <ToastContainer />
    </>
  );
}

export default App;

{
  /* <div className="min-h-screen">
<div className="gradient-bg-welcome">
  <Navbar/>
  <Welcome/>
</div>
</div> */
}
