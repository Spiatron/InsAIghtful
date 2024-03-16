"use client"
import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper" style={{ fontFamily: "kufi", color: "", fontWeight: "bold" }}>
      <h1 className="primary-heading">Would you like to stay updated?</h1>
      <h1 className="primary-heading" style={{ fontFamily: "angrybird", color: "#fe9e0d", fontSize: "40px" }}>Subscribe us</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="yourmail@gmail.com" />
        <button className="secondary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
