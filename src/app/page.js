import React from "react";
import Home from "@/components/Mainpage/Home";
import AboutGallery from "@/components/Mainpage/AboutGallery";
import Work from "@/components/Mainpage/Work";
import styles from '@/styles/mainpageStyles.css';

const page = () => {
  return ( 
    <div className="App">
    <Home />
    <AboutGallery />
    <Work />
  </div> 
  )
}
export default page;
