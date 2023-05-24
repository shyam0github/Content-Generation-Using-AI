import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const User = () => {
  return (
    <div className="module">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default User;
