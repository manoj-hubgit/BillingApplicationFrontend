import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import EditProduct from "./Pages/EditProduct";
import AddProduct from "./Pages/AddProduct";
import AllProduct from "./Pages/AllProduct";
import Report from "./Pages/Report";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import "./App.css"
const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        {/* <SideBar /> */}
        <div className="content-container">
          <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
        
      </BrowserRouter>
    </div>
  );
};

export default App;
