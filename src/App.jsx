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
import Settings from "./Pages/Settings";
import { useSelector } from "react-redux";
import LandingPage from "./Pages/LandingPage";
import PrivateRoute from "./Components/PrivateRoute";
const App = () => {
  const  user=useSelector((state)=>state.user.currentuser)
  return (
    <div className="app-container">
      <BrowserRouter>
      {user ? <SideBar /> : null}
      {/* {user && <SideBar />} 
      <div className={user ? "content-container" : "full-width-container"}> */}
          <Routes>
          <Route path="/" element={user ? <AllProduct/> : <LandingPage/>} />
          <Route element={<PrivateRoute/>} >
           <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          </Route>
         
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* </div> */}
        
      </BrowserRouter>
    </div>
  );
};

export default App;
