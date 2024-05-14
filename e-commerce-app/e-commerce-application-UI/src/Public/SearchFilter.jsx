import React, { useState } from 'react';
import axios from "axios";

const SearchFilter = () => {
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    availability: '',
    rating: '',
    discount: '',
    category: ''
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // You can perform further actions with the filter state here, such as sending it to your API
   // alert(filter);
   try {
    const response = await axios.get('http://localhost:8080/api/v1/filter/products', 
    {},
    {
      params: filter,
        headers: {'Content-Type': 'application/json'  },
                 withCredentials:'true'
                                           
    });
    
    if (response.status === 200) {
      alert("Filter applied successfully");
      setFilteredProducts(response.data);
      //window.location.reload();
      // Handle the response data here, e.g., update the UI with filtered products
    }
  } catch (error) {
    console.error("Message:", error);
  }
}
  return (
    <div className="p-4 border border-gray-200 rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="minPrice" className="block text-gray-700">Min Price:</label>
          <input type="text" id="minPrice" name="minPrice" value={filter.minPrice} onChange={handleChange} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="maxPrice" className="block text-gray-700">Max Price:</label>
          <input type="text" id="maxPrice" name="maxPrice" value={filter.maxPrice} onChange={handleChange} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="availability" className="block text-gray-700">Availability:</label>
          <input type="text" id="availability" name="availability" value={filter.availability} onChange={handleChange} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700">Rating:</label>
          <input type="text" id="rating" name="rating" value={filter.rating} onChange={handleChange} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700">Discount:</label>
          <input type="text" id="discount" name="discount" value={filter.discount} onChange={handleChange} className="form-input mt-1 block w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category:</label>
          <select id="category" name="category" value={filter.category} onChange={handleChange} className="form-select mt-1 block w-full">
            <option value="">Select Category</option>
            <option value="MOBILE">MOBILE</option>
            <option value="LAPTOP">LAPTOP</option>
            <option value="RAM">RAM</option>
            <option value="SSD">SSD</option>
            <option value="WATCH">WATCH</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Filter</button>
      </form>
       {/* Render filtered products */}
       <div className="mt-4">
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map(product => (
              <li key={product.productId}>
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <p>Price: {product.productPrice}</p>
                <p>Availability: {product.availabilityStatus}</p>
                <p>Category: {product.productCatagory}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
