'use client'
import React from "react";
import Link from "next/link";
// import style from "@/styles/UpsideAboutUs.module.css";
import '../styles/fonts.module.css';
import styles from '@/styles/UpsideAboutUsStyles.css';


const UpsideAboutUs = () => {
    return <>
        <div className="UpsideAboutUs">
            <div className="container content">
                <h4 className="mainHeading" style={{ fontFamily: "delius" }}>LEARNING THROUGH AI</h4>

                <h1 className="para" style={{ fontFamily: "delius", color: "white" }}>
                    Join <span className="mainWord" style={{ fontFamily: "circuitboard" }}>LEARNIFY</span>, where the complexity of learning meets the simplicity of discovery
                </h1>

                <hr className="flex-grow-1 bg-secondary" style={{border: "1px solid #eff7f6"}}/>
                <h5 style={{ fontFamily: "delius" }}>
                    Revolutionize your educational experience with intelligent playlists, automated quizzes, and a touch of innovation, making every lesson an effortlessly enriching journey!"
                </h5>
            </div>
            <div className="mainimage">
                <img className="" src="/images/aboutUs/pic1.png" alt="Description" />
            </div>
        </div>
    </>
};
export default UpsideAboutUs;