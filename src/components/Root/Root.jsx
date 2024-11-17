import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <div className="sm:h-[60px] md:h-[67px]">
        <Navbar />
      </div>
      <div className="min-h-[calc(100vh-120px)] overflow-x-hidden ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
