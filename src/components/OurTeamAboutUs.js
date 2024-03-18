"use client";
import React from "react";
import Link from "next/link";
import "../styles/fonts.module.css";
import styles from "@/styles/ourTeamStyles.css";
import { GrInstagram } from "react-icons/gr";
import { RiGithubLine } from "react-icons/ri";
import { Facebook, Linkedin } from 'lucide-react';

const OurTeamAboutUs = () => {
  return (
    <>
      <div className="OurTeam">
      <h4 className="mainHeading" style={{ fontFamily: "delius" }}>
            Developing <span className="mainWord" style={{ fontFamily: "delius" }}>Team</span>
          </h4>
          <hr
            className="flex-grow-1 bg-secondary para"
            style={{
              border: "2px solid #eff7f6",
              width: "50%"
            }}
          />
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
                <div>
                  <Link id="github" href="https://github.com/Spiatron" passHref target="_blank" rel="noopener noreferrer">
                  <RiGithubLine size={25} />
                  </Link>
                </div>
                <div>
                  <Link id="facebook" href="https://www.facebook.com/spiatron/" passHref target="_blank" rel="noopener noreferrer">
                  <Facebook size={25} />
                  </Link>
                </div>
                <div>
                  <Link id="Linkedin" href="https://www.linkedin.com/in/ahsan-hafeez-116943278/" passHref target="_blank" rel="noopener noreferrer" >
                    <Linkedin/>
                  </Link>
                </div>
              </div>
            </center>
          </div>

          <div className="Devcard">
            <center>
              <div className="profileimage">
                <img src="/images/aboutUs/shady2.gif" alt="" />
              </div>
              <div className="Name">
                <p className="fs-1" style={{ fontFamily: "Kufi" }}>Shehryar Khatri </p>
                <p style={{ fontFamily: "kufi" }}>Integration Developer</p>
              </div>
              <div className="socialbar">
                <div>
                  <Link id="github" href="https://github.com/ShehryarHussainKhatri" passHref target="_blank" rel="noopener noreferrer">
                  <RiGithubLine size={25} />
                  </Link>
                </div>
                <div>
                  <Link id="facebook" href="https://www.facebook.com/shehryar.hussain.khatri" passHref target="_blank" rel="noopener noreferrer">
                  <Facebook size={25} />
                  </Link>
                </div>
                <div>
                  <Link id="Linkedin" href="https://www.linkedin.com/in/shehryarhussainkhatri/" passHref target="_blank" rel="noopener noreferrer" >
                    <Linkedin/>
                  </Link>
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
                <div>
                  <Link id="github" href="https://github.com/Muhammad-Alii2" passHref target="_blank" rel="noopener noreferrer">
                  <RiGithubLine size={25} />
                  </Link>
                </div>
                <div>
                  <Link id="instagram" href="https://www.instagram.com/mohammadali.26/?hl=en" passHref target="_blank" rel="noopener noreferrer">
                    <GrInstagram size={22} />
                  </Link>
                </div>
                <div>
                  <Link id="Linkedin" href="https://www.linkedin.com/in/mohammadali26/" passHref target="_blank" rel="noopener noreferrer" >
                    <Linkedin/>
                  </Link>
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
