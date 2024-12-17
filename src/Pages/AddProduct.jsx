import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        productName: '',
        productPrice: '',
        productQuantity: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to add a product.");
                return;
            }
            await axios.post("https://billhub.onrender.com/api/product/createProduct", productData, {
                headers: {
                    'Authorization': token
                }
            });
            alert('Product added successfully');
            // Clear input fields
            setProductData({
                productName: '',
                productPrice: '',
                productQuantity: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='my-auto mx-auto'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label value="Product Name:" />
                        <TextInput
                            type="text"
                            placeholder="Lays small"
                            value={productData.productName}
                            onChange={handleChange}
                            id="productName"
                        />
                    </div>
                    <div>
                        <Label value="Product Price:" />
                        <TextInput
                            type="text"
                            placeholder="5"
                            value={productData.productPrice}
                            onChange={handleChange}
                            id="productPrice"
                        />
                    </div>
                    <div>
                        <Label value="Product Quantity:" />
                        <TextInput
                            type="text"
                            placeholder="55"
                            value={productData.productQuantity}
                            onChange={handleChange}
                            id="productQuantity"
                        />
                    </div>
                    <Button className='my-4' type='submit' disabled={loading}>
                        {loading ? 'Adding...' : 'ADD'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
