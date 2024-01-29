"use client"
import React, { useState } from 'react';

const Page = () => {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const simpleTex = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('http://localhost:5000/mathOCR', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
            const textResults = data.latex;
            setRecognizedText(textResults);
        } else {
          console.error("Cant extract latex");
        }
      } else {
        console.error('Server response not OK');
      }
    } catch (error) {
      console.error('Error during OCR:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={simpleTex}>Perform SimpleTex</button>
      <div>
        <img src={image && URL.createObjectURL(image)} alt="" />
        <p>{recognizedText}</p>
      </div>
    </div>
  );
};

export default Page;
