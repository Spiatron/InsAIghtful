import React from "react";
import Home from "@/components/Mainpage/Home";
import About from "@/components/Mainpage/About";
import Work from "@/components/Mainpage/Work";
import Contact from "@/components/Mainpage/Contact";
import styles from '@/styles/mainpageStyles.css';

const page = () => {
  return (
    <div className="App">
    <Home />
    <About />
    <Work />
    <Contact />
  </div> 
  )
}
export default page;
