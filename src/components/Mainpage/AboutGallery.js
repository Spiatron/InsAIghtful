"use client"
import React from "react";
import Link from "next/link";
// import { BsFillPlayCircleFill } from "react-icons/bs";

const AboutGallery = () => {
  return (
    <div className="about-section-container" style={{ fontFamily: "kufi", color: "", fontWeight: "bold" }}>
      <div className="about-background-image-container">
        <img className="img" src="/images/mainpage/about-background.png" alt="Description" />
      </div>
      <div className="about-section-image-container">
        <img className="img" src="/images/mainpage/gallery2.png" alt="Description" />
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
        <Link className="about-buttons-container text-decoration-none"  href="/gallery">
          <div className="gallery-secondary-button">
            <div className="box">V</div>
            <div className="box">I</div>
            <div className="box">S</div>
            <div className="box">I</div>
            <div className="box">T</div>
            <div className="box">-</div>
            <div className="box">G</div>
            <div className="box">A</div>
            <div className="box">L</div>
            <div className="box">L</div>
            <div className="box">E</div>
            <div className="box">R</div>
            <div className="box">Y</div>
          </div>
          {/* <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </Link>
      </div>
    </div>
  );
};

export default AboutGallery;
