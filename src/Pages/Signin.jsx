import axios from "axios";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../Redux/Slice/UserSlice";
const Signin = () => {
const [formData,setFormData]= useState();
const dispatch= useDispatch();
const {loading,error}=useSelector((state)=>state.user)
const navigate=useNavigate();
const handlechange=(e)=>{
setFormData({...formData,[e.target.id]:e.target.value});
}
const handleSubmit=async (e)=>{
  e.preventDefault();
  try {
    dispatch(signInStart())
    const response=await axios.post("http://localhost:5000/api/auth/login",formData)
    const value=response.data.message;
    dispatch(signInSuccess(value))
    localStorage.setItem("token",response.data.token);
    localStorage.setItem("storeName",response.data.storeName);
     navigate('/');
    console.log(value);
    
  } catch (error) {
    const err=error.data.message;
    console.log(err);
    dispatch(signInFailure((err)))
  }finally{
    dispatch(signInFailure())
  }
}
  return (
    
    <div className="min-h-screen flex mx-auto ">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 p-5">
       
        <div className="flex-1 md:text-left text-center">
          <h1 className="text-4xl font-bold">BillHub</h1>
          <p className="text-sm mt-4">
            Signup using Email and password or use Google. <br /> **This is a Demo
            Project**
          </p>
        </div>

        
        <div className="flex-1 max-w-md w-full bg-white p-6 shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
           <div>
            <Label value="Email"/>
            <TextInput type="email" placeholder="name@company.com" onChange={handlechange} id="email" />
           </div>
           <div>
            <Label value="Password"/>
            <TextInput type="password" placeholder="Enter your Password" onChange={handlechange} id="password" />
           </div>
           <Button className="mt-2" type="submit" disabled={loading}>
            {loading ? (
              <>
               <Spinner color="warning" aria-label="Warning spinner example" />
               <span className="pl-3">Loading...</span>
              </>
            ):('Sign In')}
            </Button>
      
          </form>
          <div className="flex gap-2 text-sm mt-6">
            <span>Don't have an account ?</span>
            <Link to="/signup" className="text-red-400">SignUp</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
