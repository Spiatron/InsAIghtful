"use client";
import React from "react";
import "../styles/fonts.module.css";
import styles from "@/styles/ourTeamStyles.css";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FiGithub } from "react-icons/fi";

const OurTeamAboutUs = () => {
  return (
    <>
      <div className="OurTeam">
        <div className="DevCardsPosition">
          <div className="Devcard">
            <center>
              <div className="profileimage">
                <img src="/images/aboutUs/ahsan.gif" alt="" />
              </div>
              <div className="Name">
                <p className="fs-1" style={{ fontFamily: "Kufi" }} >Ahsan Hafeez</p>
                <p style={{ fontFamily: "kufi" }}>Front-end Developer</p>
              </div>
              <div className="socialbar">
                <div id="github">
                  <FiGithub />
                </div>
                <div id="instagram">
                  {" "}
                  <GrInstagram />
                </div>
                <div id="facebook">
                  {" "}
                  <FaFacebook />
                </div>
                <div id="twitter">
                  {" "}
                  <FaXTwitter />
                </div>
              </div>
            </center>
          </div>

          <div className="Devcard">
            <center>
              <div className="profileimage">
                <img src="/images/aboutUs/shady.gif" alt="" />
              </div>
              <div className="Name">
                <p className="fs-1" style={{ fontFamily: "Kufi" }}>Shehryar Khatri </p>
                <p style={{ fontFamily: "kufi" }}>Integration Developer</p>
              </div>
              <div className="socialbar">
                <div id="github">
                  <FiGithub />
                </div>
                <div id="instagram">
                  {" "}
                  <GrInstagram />
                </div>
                <div id="facebook">
                  {" "}
                  <FaFacebook />
                </div>
                <div id="twitter">
                  {" "}
                  <FaXTwitter />
                </div>
              </div>
            </center>
          </div>

          <div className="Devcard">
            <center>
              <div className="profileimage">
                <img src="/images/aboutUs/shadow.gif" alt="" />
              </div>
              <div className="Name">
                <p className="fs-1" style={{ fontFamily: "Kufi" }}>Muhammad Ali</p>
                <p style={{ fontFamily: "kufi" }}>Back-end Developer</p>
              </div>
              <div className="socialbar">
                <div id="github">
                  <FiGithub />
                </div>
                <div id="instagram">
                  {" "}
                  <GrInstagram />
                </div>
                <div id="facebook">
                  {" "}
                  <FaFacebook />
                </div>
                <div id="twitter">
                  {" "}
                  <FaXTwitter />
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurTeamAboutUs;
