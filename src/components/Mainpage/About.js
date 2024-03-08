"use client"
import React from "react";
// import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container" style={{ fontFamily: "kufi", color: "", fontWeight: "bold" }}>
      <div className="about-background-image-container">
        <img className="" src="/images/mainpage/about-background.png" alt="Description" />
      </div>
      <div className="about-section-image-container">
        <img className="" src="/images/mainpage/gallery2.png" alt="Description" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">Gallery</p>
        <h1 className="gallery-primary-heading">
        Your Personal Learning  <span style={{ fontFamily: "angrybird", color: "#fe9e0d" }} >Gallery</span>
        </h1>
        <p className="primary-text">
        Curate your learning universe with courses tailored to you. Explore your personalized gallery, where every course you create finds its home.
        </p>
        <p className="primary-text">
        Seamlessly pick up where you left off, anytime, anywhere, and embark on your journey of continual learning.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          {/* <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default About;
