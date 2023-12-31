"use client";
import React, { useState, useEffect } from "react";
import { tesseract } from "@/lib/tesseract";

const Page = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    setImageData(image);
  };

  const performOCR = async () => {
    if (!imageData) return;
    try {
      const text = await tesseract(imageData);
      setRecognizedText(text);
    } catch (error) {
      console.error("Error during OCR:", error);
    }
  };

  useEffect(() => {
    performOCR();
  }, [imageData]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div>
        <img src={imageData && URL.createObjectURL(imageData)} alt="" />
        <p>{recognizedText}</p>
      </div>
    </div>
  );
};

export default Page;
