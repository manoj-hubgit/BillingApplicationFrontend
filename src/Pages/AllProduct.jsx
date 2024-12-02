import axios from "axios";
import { Button, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    fetchStoreName();
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer); 
  }, [searchTerm]);

  const fetchStoreName = () => {
    const name = localStorage.getItem("storeName");
    if (name) {
      setStoreName(name);
    } else {
      setStoreName("Store Name");
    }
  };

  const handleBillGeneration = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to generate a bill.");
      return;
    }
    try {
      const productDetails = products
        .filter((product) => product.quantity > 0)
        .map(({ _id, productName, productPrice, quantity }) => ({
          productId: _id,
          productName,
          productPrice,
          quantity,
        }));

      if (productDetails.length === 0) {
        alert("No products selected for the bill.");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/bill/generateBill",
        { products: productDetails },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const bill=response.data.bill;
      const formattedDate = new Date(bill.createdAt).toLocaleDateString();
      const formattedTime = new Date(bill.createdAt).toLocaleTimeString();

      const billWindow = window.open("", "_blank", "width=400,height=400");
      const billContent = `
        <html>
          <head>
            <title>Bill</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f4f4f4;
              }
              h1, h2, h3 {
                text-align: center;
              }
            </style>
          </head>
          <body>
            <h1>${storeName}</h1>
            <h2>Bill Details</h2>
            <h3>Bill No: ${bill.billNumber}</h3>
            <h3>Date: ${formattedDate} | Time: ${formattedTime}</h3>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price (Rs)</th>
                  <th>Quantity</th>
                  <th>Total (Rs)</th>
                </tr>
              </thead>
              <tbody>
                ${productDetails
                  .map(
                    (product) => `
                    <tr>
                      <td>${product.productName}</td>
                      <td>${product.productPrice}</td>
                      <td>${product.quantity}</td>
                      <td>${product.productPrice * product.quantity}</td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
            <h2>Total: Rs ${calculateTotal()}</h2>
            <p>Thank you for shopping with us!</p>
          </body>
        </html>
      `;

      billWindow.document.write(billContent);
      billWindow.document.close();
      billWindow.print();

      alert("Bill generated successfully!");
      setProducts(products.map((product) => ({ ...product, quantity: 0 })));
      setSearchTerm("");
    } catch (error) {
      alert("Failed to generate bill. Please try again.");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view all products.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/allProducts?search=${searchTerm}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const productData = response.data.result.map((product) => ({
        ...product,
        quantity: 0,
      }));
      setProducts(productData);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch products");
    }
  };

  const handleQuantityChange = (id, value) => {
    setProducts(
      products.map((product) =>
        product._id === id
          ? { ...product, quantity: Math.max(0, value) }
          : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.productPrice * product.quantity,
      0
    );
  };

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
      <div className="w-96 mb-4">
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price (Rs)</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">
                {product.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.productPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center">
                  <Button
                    size="xs"
                    onClick={() =>
                      handleQuantityChange(product._id, product.quantity - 1)
                    }
                    disabled={product.quantity === 0}
                    className="mr-2"
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        product._id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-16 text-center border border-gray-300 rounded"
                  />
                  <Button
                    size="xs"
                    onClick={() =>
                      handleQuantityChange(product._id, product.quantity + 1)
                    }
                    className="ml-2"
                  >
                    +
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <h2 className="text-lg font-semibold">Total: Rs {calculateTotal()}</h2>
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={handleBillGeneration}>Generate Bill</Button>
      </div>
    </div>
  );
};

export default AllProduct;
