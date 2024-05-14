// src/App.js

import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Implement image upload logic here
    console.log("Uploading image...", image);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Image Upload</h1>
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
  );
}

export default ImageUpload;
