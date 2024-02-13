'use client'
import React from "react";
import '../styles/fonts.module.css';
import styles from '@/styles/ourTeamStyles.css';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FiGithub } from "react-icons/fi";

const OurTeamAboutUs = () => {
    return <>
        <div className="OurTeam">
            <div className="container content">
                {/* <h4 className="mainHeading" style={{ fontFamily: "delius" }}>OUR SERVICES</h4> */}

                {/* <h1 className="paraHeading" style={{ fontFamily: "delius", color: "white" }}>
                    Our <span className="mainWord">Dev</span> Team
                </h1>

                <hr className="flex-grow-1 bg-secondary" style={{ border: "2px solid #eff7f6", width: "30%", marginLeft: "" }} /> */}


            </div>


            <div className="cardsPosition">
                <div class="Devcard">
                    <center>
                        <div class="profileimage">
                            <img src="" alt="" />
                        </div>
                        <div class="Name">
                            <p>Ahsan Hafeez</p>
                        </div>
                        <div class="socialbar">
                            <div id="github"><FiGithub /></div>
                            <div id="instagram"> <GrInstagram /></div>
                            <div id="facebook"> <FaFacebook /></div>
                            <div id="twitter"> <FaXTwitter /></div>
                        </div>
                    </center>
                </div>

                <div class="Devcard">
                    <center>
                        <div class="profileimage">
                            <img src="" alt="" />
                        </div>
                        <div class="Name">
                            <p>Shehryar Khatri </p>
                        </div>
                        <div class="socialbar">
                            <div id="github"><FiGithub /></div>
                            <div id="instagram"> <GrInstagram /></div>
                            <div id="facebook"> <FaFacebook /></div>
                            <div id="twitter"> <FaXTwitter /></div>
                        </div>
                    </center>
                </div>

                <div class="Devcard">
                    <center>
                        <div class="profileimage">
                            <img src="" alt="" />
                        </div>
                        <div class="Name">
                            <p>Mohmmed Ali</p>
                        </div>
                        <div class="socialbar">
                            <div id="github"><FiGithub /></div>
                            <div id="instagram"> <GrInstagram /></div>
                            <div id="facebook"> <FaFacebook /></div>
                            <div id="twitter"> <FaXTwitter /></div>
                        </div>
                    </center>
                </div>



            </div>


        </div>
    </>
};
export default OurTeamAboutUs;