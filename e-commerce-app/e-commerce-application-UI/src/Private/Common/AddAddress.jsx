import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/AuthProvider";

const AddAddress = () => {
  // const [addressData, setAddressData] = useState({
  //   streetAddress: "",
  //   streetAddressAdditional: "",
  //   city: "",
  //   state: "",
  //   pincode: "",
  //   addressType: ""
  // });
  const [addressData, setAddressData]=useAuth();
  const navigate = useNavigate();
  const handleChange = e => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value
    });
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   // You can handle form submission here, e.g., send data to backend
  //   try {
  //     // Send registration request to the backend server
  //     const response = axios.post(
  //       "http://localhost:8080/api/v1/address",
  //       addressData,
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: "true"
  //       }
  //     );

  //     console.log((await response).status);
  //     if ((await response).status === 200) {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Message:", error);
  //   }
  //   console.log(addressData);
  //   // Reset form fields
  //   setAddressData({
  //     streetAddress: "",
  //     streetAddressAdditional: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //     addressType: ""
  //   });
  // };

  return (
    <div className="max-w-md mx-auto">
      <form
        //onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="streetAddress"
          >
            Street Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="streetAddress"
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={addressData.streetAddress}
            onChange={handleChange}
            required // Marked as required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="streetAddressAdditional"
          >
            Additional Address Info
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="streetAddressAdditional"
            type="text"
            placeholder="Additional Address Info"
            name="streetAddressAdditional"
            value={addressData.streetAddressAdditional}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="City"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            required // Marked as required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="State"
            name="state"
            value={addressData.state}
            onChange={handleChange}
            required // Marked as required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pincode"
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={addressData.pincode}
            onChange={handleChange}
            pattern="[0-9]*" // Only accepts numeric values
            title="Pincode should contain only numbers" // Error message if pattern mismatched
            required // Marked as required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="addressType"
          >
            Address Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="addressType"
            name="addressType"
            value={addressData.addressType}
            onChange={handleChange}
            required // Marked as required
          >
            <option value="">Select Address Type</option>
            <option value="HOME">Home</option>
            <option value="WORK">Work</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
