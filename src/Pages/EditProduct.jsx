import axios from "axios";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [storeName,setStoreName]=useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct,setEditingProduct]=useState(null);
  const [deleteProduct,setDeleteProduct]=useState(null);
  const [formData,setFormData]=useState({
    productName:"",
    productPrice:"",
    productQuantity:"",
  })
  useEffect(() => {
    fetchData();
    fetchStoreName();
  }, []);

  const fetchStoreName = () => {
    const name = localStorage.getItem("storeName"); 
    if (name) {
      setStoreName(name);
    } else {
      setStoreName("Store Name");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view all products.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/product/allProducts", {
        headers: {
          Authorization: token,
        },
      });
      setProducts(response.data.result);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch products");
    }
  };

const handleEdit=(product)=>{
  setEditingProduct(product._id);
    setFormData({
      productName:product.productName,
      productPrice:product.productPrice,
      productQuantity:product.productQuantity,
    });
};

const handleInput=(e)=>{
  const {name,value}= e.target;
  setFormData((prev)=>({
    ...prev,
    [name]:value,
  }));
};
const handleDelete=async(productId)=>{
  const token= localStorage.getItem('token');
  setDeleteProduct(productId)
  if(!token){
    alert("please login to update the product");
    return;
  }
  try {
    await axios.delete(`http://localhost:5000/api/product/deleteProduct/${productId}`,{
      headers:{
        Authorization:token,
      }
    });
    setEditingProduct(null);
    fetchData();
  } catch (error) {
    
  }
}
const handleUpdate = async ()=>{
  const token = localStorage.getItem('token');
  if(!token){
    alert("please login to update the product");
    return;
  }
 try {
  await axios.put(`http://localhost:5000/api/product/updateProduct/${editingProduct}`,
    formData,{
      headers:{
        Authorization:token,
      },
    }
  );
  alert("Product updated successfully");
      setEditingProduct(null);
      fetchData();
} catch (error) {
  alert("Failed to update product");
} 
}


  if (loading)
    return (
      <div className="mx-auto my-40">
        <Spinner color="failure" aria-label="Failure spinner example" />
        <p>Loading...</p>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto my-12">
      <h1 className="text-2xl font-bold mb-4">{storeName}</h1>
      {editingProduct ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Edit Product</h2>
        <div className="mb-4">
          <label className="block">Product Name:</label>
          <input 
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInput}
          className="border px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
            <label className="block">Product Price (Rs):</label>
            <input
              type="number"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleInput}
              className="border px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">Product Quantity:</label>
            <input
              type="number"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleInput}
              className="border px-4 py-2 w-full"
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update</button>
        <button className="bg-grey-500 text-while px-4 py-2 rounded" onClick={()=>setEditingProduct(null)}>Cancel</button>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price (Rs)</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
              <td className="border border-gray-300 px-4 py-2">{product.productPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{product.productQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white ml-2 px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    
    </div>
  );
};

export default EditProduct;
