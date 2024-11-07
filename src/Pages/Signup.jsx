import axios from "axios";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/auth/register", formData);
            navigate('/signin');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex mx-auto">
            <div className="max-w-5xl mx-auto p-5">
                <div className="max-w-lg w-full bg-white p-6 shadow-md rounded-lg">
                    <form onSubmit={handleSubmit} className="flex flex-wrap">
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Store Name" />
                            <TextInput type="text" placeholder="Enter your Store Name" onChange={handleChange} id="storeName" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Email" />
                            <TextInput type="email" placeholder="name@company.com" onChange={handleChange} id="email" />
                        </div>

                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Phone Number" />
                            <TextInput type="tel" placeholder="Enter your Phone Number" onChange={handleChange} id="phone" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Street" />
                            <TextInput type="text" placeholder="Street Address" onChange={handleChange} id="street" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="City" />
                            <TextInput type="text" placeholder="City" onChange={handleChange} id="city" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="State" />
                            <TextInput type="text" placeholder="State" onChange={handleChange} id="state" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Postal Code" />
                            <TextInput type="text" placeholder="Postal Code" onChange={handleChange} id="postalCode" />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <Label value="Country" />
                            <TextInput type="text" placeholder="Country" onChange={handleChange} id="country" />
                        </div>

                        <div className="w-full px-2">
                            <Label value="Password" />
                            <TextInput type="password" placeholder="Enter your Password" onChange={handleChange} id="password" />
                        </div>

                        <div className="w-full px-2">
                            <Button className="mt-2 w-full" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner color="warning" aria-label="Warning spinner example" />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : ('Sign Up')}
                            </Button>
                        </div>
                    </form>

                    <div className="flex gap-2 text-sm mt-6 justify-center">
                        <span>Already have an account?</span>
                        <Link to="/signin" className="text-red-400">Signin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
