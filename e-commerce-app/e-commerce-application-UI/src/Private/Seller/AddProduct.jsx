import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productId:'',
    productName: '',
    productDescription: '',
    productPrice: '',
    productQuantity: '',
    productCategory: ''
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload =  async (e) => {
    // Implement image upload logic here
    console.log("Uploading image...", image);
    handleSubmit()
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/products/category', product,
      {  headers: {'Content-Type': 'application/json'  },
                                              withCredentials:'true'
                                           }      
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/products/category', product,
      {  headers: {'Content-Type': 'application/json'  },
                                              withCredentials:'true'
                                           }      
      );
      
      if (response.status === 200) {
        alert("Product added successfully");
        // Reset the form fields after successful submission
        setProduct({
          productName: '',
          productDescription: '',
          productPrice: '',
          productQuantity: '',
          productCategory: ''
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700">Product Name:</label>
          <input type="text" id="productName" name="productName" value={product.productName} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700">Product Description:</label>
          <textarea id="productDescription" name="productDescription" value={product.productDescription} onChange={handleChange} className="form-textarea mt-1 block w-full" required></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700">Product Price:</label>
          <input type="number" id="productPrice" name="productPrice" value={product.productPrice} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="productQuantity" className="block text-gray-700">Product Quantity:</label>
          <input type="number" id="productQuantity" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="form-input mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category:</label>
          <select id="category" name="category" value={product.productCategory} onChange={handleChange} className="form-select mt-1 block w-full" >
            <option value="">Select Category</option>
            <option value="MOBILE">MOBILE</option>
            <option value="LAPTOP">LAPTOP</option>
            <option value="RAM">RAM</option>
            <option value="SSD">SSD</option>
            <option value="WATCH">WATCH</option>
          </select>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-1xl font-bold mb-1">Image Upload</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!image}
        className={`py-2 px-4 rounded ${
          image ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
        } text-white`}
      >
        Upload Image
      </button>
    </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
