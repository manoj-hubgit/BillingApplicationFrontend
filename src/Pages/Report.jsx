import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";

const BillsReport = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = localStorage.getItem("token");
                setLoading(true);
                const response = await axios.get("http://localhost:5000/api/bill/getBillData", {
                    headers: {
                        Authorization: token,
                    },
                });
                setBills(response.data.bills);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch bills. Please try again later.");
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    const [expanded, setExpanded] = useState({});

    const toggleMore = (billId) => {
        setExpanded((prev) => ({
            ...prev,
            [billId]: !prev[billId],
        }));
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading bills...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <h3 className="text-danger">{error}</h3>
            </div>
        );
    }


    const sortedBills = [...bills].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="container m-3 mt-4">
            <h2 className="text-center mb-4">Bills Report</h2>
            {bills.length === 0 ? (
                <h4 className="text-center text-secondary">No bills available.</h4>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedBills.map((bill) => (
                        <Card key={bill._id} className="shadow-lg p-4">
                            <h5 className="font-bold text-lg">Bill Number: {bill.billNumber}</h5>
                            <h6 className="text-sm text-gray-500">Date: {new Date(bill.createdAt).toLocaleString()}</h6>

                           
                            <ul className="mt-3">
                                {bill.products.slice(0, expanded[bill._id] ? bill.products.length : 3).map((product) => (
                                    <li key={product.productId?._id} className="text-sm">
                                        <span className="font-semibold">{product.productId?.productName || "Unknown Product"}</span> - 
                                        {product.quantity} x ₹{product.price}
                                    </li>
                                ))}
                            </ul>

                            
                            {bill.products.length > 3 && (
                                <button
                                    className="text-blue-500 mt-2"
                                    onClick={() => toggleMore(bill._id)}
                                >
                                    {expanded[bill._id] ? "Show Less" : "Show More"}
                                </button>
                            )}

                            <h5 className="mt-3 text-xl font-semibold">Total: ₹{bill.totalAmount}</h5>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BillsReport;
