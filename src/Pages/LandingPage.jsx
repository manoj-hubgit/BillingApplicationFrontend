import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const LandingPage = () => {
  return (
   <div className=" min-w-full">
    <Header/>
      <div className="min-h-screen flex flex-col items-center text-center justify-center">
      <h1 className="text-5xl font-bold">Welcome to BillHub</h1>
      <p className="text-xl mt-4">Manage your store and billing efficiently.</p>
      <div className="mt-6">
        <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        <span className="mx-2">or</span>
        <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
      </div>
    </div>
   </div>
  
  );
};

export default LandingPage;
