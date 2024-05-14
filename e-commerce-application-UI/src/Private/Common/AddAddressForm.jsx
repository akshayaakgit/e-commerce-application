// AddForm.js
import React, { useState } from 'react';
import axios from 'axios';
import AddAddress from './AddAddress';
import ContactForm from './ContactForm';


const AddAddressForm = ({ endpoint }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoint, formData);
      console.log('Data submitted successfully:', response.data);
      // Reset form after successful submission
      setFormData({});
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
    <form onSubmit={handleSubmit}>
      {/* Render form fields based on your requirements */}
      <AddAddress/>
      <ContactForm/>
      <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
      {/* Additional fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddAddressForm;
