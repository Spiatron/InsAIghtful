// "use client"
import React from "react";
import { getAuthSession } from "@/lib/auth";
// import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import { PiYoutubeLogoFill } from "react-icons/pi";
// import MainPageSignInButton from "../../components/MainPageSignInButton";
// import MainPageSignOutButton from "../../components/MainPageSignOutButton";
import SignInButton from "../../components/SignInButton";
import SignOutButton from "../../components/SignOutButton";


const Home = async () => {
  const session = await getAuthSession();
  return (
    <div className="home-container" style={{ fontFamily: "kufi", color: "", fontWeight: "bold" }}>
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
        <img src="/images/mainpage/home-banner-background.png" alt="Description" />
        </div>
        <div className="home-text-section">
        <h1 className="primary-subheading">Learning through AI</h1>
          <h1 className="Home-primary-heading">
          Effortless course creation with <span style={{ fontFamily: "angrybird", color: "#fe9e0d" }} >LEARNIFY</span>
          </h1>
          <p className="primary-text">
          Create courses effortlessly. Customize units to your needs.  <span className="openai"><SiOpenai size={30}/></span> API will compile playlists & <span className="youtube"><PiYoutubeLogoFill size={30}/></span> API will curated video content for you.
          </p>
          <div className="Home-secondary-button">
          Log In <FiArrowRight/>{" "}
            <span>
             {session?.user && <SignOutButton   />} 
              </span>
              <span>
                {!session?.user && <SignInButton />}
              </span>
          </div>
        </div>
        <div className="home-image-section">
          <img  src="/images/mainpage/CourseCreation.jpg" alt="Description" />
        </div>
      </div>
    </div>
  );
};

export default Home;
