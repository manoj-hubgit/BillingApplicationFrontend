import axios from 'axios';
import { TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

const AllProduct = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=async()=>{
        const token=localStorage.getItem("token");
        if (!token) {
            alert("Please log in to view all product.");
            return;
        }
            try {
                const response=await axios.get("http://localhost:5000/api/product/allProducts",
                    {
                        headers:{
                            'Authorization':token
                        }
                    }
                );
                setProducts(response.data.result);
                setLoading(false);
            } catch (error) {
                setError("Failed to Fetch Product");
            }
    }
    return (
        <div className='mx-auto my-12'>
            <div className='w-96'>
                 <TextInput placeholder='Search...' />
            </div>
           <div>
            {products.map((product,element)=>{
                return(
                    <div key={product._id}>
                        <h1>{product.productName}</h1>
                        </div>
                    
                )
            })}
           </div>
        </div>
    );
};

export default AllProduct;