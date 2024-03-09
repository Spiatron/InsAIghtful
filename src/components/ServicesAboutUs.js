"use client";
import React from "react";
import "../styles/fonts.module.css";
import styles from "@/styles/ServicesAboutUsStyles.css";

const ServicesAboutUs = () => {
  return (
    <>
      <div className="ServicesAboutUs">
        <div className="container content">
          <h4 className="mainHeading" style={{ fontFamily: "delius" }}>
            OUR SERVICES
          </h4>

          <h1
            className="paraHeading"
            style={{ fontFamily: "delius", color: "white" }}
          >
            What we <span className="mainWord">do</span> ?
          </h1>

          <hr
            className="flex-grow-1 bg-secondary para"
            style={{
              border: "2px solid #eff7f6",
              width: "10%"
            }}
          />

          <h5 className="para" style={{ fontFamily: "delius" }}>
            We are offering course creation through the power of AI. Seamlessly
            curate and fetch videos from YouTube, transforming them into
            engaging courses with interactive quizzes.
          </h5>

          <h5 className="para" style={{ fontFamily: "delius" }}>
            Plus, enjoy round-the-clock support from our friendly chatbot,
            ensuring a smooth and personalized learning experience for all.
          </h5>
          
        </div>

        <div className="cardsPosition">
          <div className="upperCards">
            <div className="cards">Course Generation</div>
            <div className="cards">User Progress</div>
            <div className="cards">Chat-bot</div>
          </div>
          <div className="lowerCards">
            <div className="cards">Quiz Generation</div>
            <div className="cards">Progress result</div>
            <div className="cards">User specified gallery</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServicesAboutUs;
