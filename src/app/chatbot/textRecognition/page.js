"use client"
import React, { useState } from 'react';
import { tesseract } from "@/lib/tesseract";

const Page = () => {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const tesseractOCR = async () => {
    if (!image) return;
    try {
      const text = await tesseract(image);
      setRecognizedText(text);
    } catch (error) {
      console.error("Error during OCR:", error);
    }
  };

  const paddleOCR = async () => {
    if (!image) return;
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('http://localhost:5000/textOCR', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          const textResults = data.result[0].join('\n');
          setRecognizedText(textResults);
        } else {
          console.error(data.error);
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
      <button onClick={tesseractOCR}>Perform Tesseract OCR</button>
      <button onClick={paddleOCR}>Perform Paddle OCR</button>
      <div>
        <img src={image && URL.createObjectURL(image)} alt="" />
        <p>{recognizedText}</p>
      </div>
    </div>
  );
};

export default Page;
