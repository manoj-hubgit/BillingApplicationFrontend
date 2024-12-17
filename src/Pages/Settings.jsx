import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [originalData,setOriginalData]=useState({});
  const[isButtonDisabled,setIsButtonDisabled]=useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://billhub.onrender.com/api/product/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFormData(response.data.result);
      setOriginalData(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Failed to load user data");
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    const updatedFormData={ ...formData, [id]: value };
    setFormData(updatedFormData);

    setIsButtonDisabled(JSON.stringify(updatedFormData) === JSON.stringify(originalData));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(isButtonDisabled) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://billhub.onrender.com/api/product/updateAccount",
        formData,
        {
          headers: { Authorization: token },
        }
      );
      alert(response.data.message);
      setOriginalData(formData);
      setIsButtonDisabled(true);
    } catch (error) {
      alert("Failed to update settings");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Are you sure want to delete the account?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        "https://billhub.onrender.com/api/product/deleteAccount",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert(response.data.message);
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="mx-auto my-20 max-w-3xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div>
        <div>
          <form onSubmit={handleUpdate}>
            <div className="flex">
              <div>
                <Label value="Store Name" />
                <TextInput
                  type="text"
                  id="storeName"
                  placeholder="Enter your store name"
                  value={formData.storeName}
                  onChange={handleInput}
                />
              </div>
              <div className="ml-2">
                <Label value="Phone" />
                <TextInput
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex">
              <div>
                <Label value="Street" />
                <TextInput
                  type="text"
                  id="street"
                  placeholder="Enter your street address"
                  value={formData.street}
                  onChange={handleInput}
                />
              </div>
              <div className="ml-2">
                <Label value="City" />
                <TextInput
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex">
              <div>
                <Label value="State" />
                <TextInput
                  type="text"
                  id="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleInput}
                />
              </div>
              <div className="ml-2">
                <Label value="Portal Code" />
                <TextInput
                  type="text"
                  id="postalCode"
                  placeholder="Enter your postal code"
                  value={formData.postalCode}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="flex">
              <div>
                <Label value="Country" />
                <TextInput
                  type="text"
                  id="country"
                  placeholder="Enter your country"
                  value={formData.country}
                  onChange={handleInput}
                />
              </div>
              <div className="m-6 ml-10">
                <Button type="submit"  disabled={isButtonDisabled}>Change</Button>
              </div>
            </div>
          </form>
          <div className="flex">
            <div>
              <Button>Forget Password</Button>
            </div>
            <div className="ml-2">
              <Button onClick={handleDelete}>Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
