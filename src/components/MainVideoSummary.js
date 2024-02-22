"use client";
import React from "react";
import "../styles/fonts.module.css";
import YouTube from "react-youtube";
import styles from "@/styles/MainVideoSummaryStyles.css";

const MainVideoSummary = ({ unitIndex, chapterIndex, chapter, onVideoEnd }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      rel: 0,
    },
  };
  return (
  < div className="MainVideoSummary">
    <div
      className=" bg-opacity-50  rounded-4 p-3 col-md-12 mt-4"
    >
      <h5 className="fs-4" style={{ fontFamily: "asul", color: "#C3CED6" }}>
        Unit#{unitIndex + 1} &bull; Chapter-{chapterIndex + 1}
      </h5>
      <h5
        className="fs-1 text-start text-capitalize fw-bold  p-1"
        style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
      >
        {chapter.name}
      </h5>
      <div
        className="youtube-container"
        style={{ borderRadius: "15px", overflow: "hidden", height: "20vw" }}
      >
        <YouTube
          title="chapter video"
          videoId={chapter.videoId}
          opts={opts}
          onEnd={(event) => {
            onVideoEnd();
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="card text-bg-success m-2">
        <h3 
          className="fs-3 m-2 text-light"
          style={{ fontFamily: "asul", color: "#C3CED6" }}
        >
          Summary:
        </h3>
        <p className="fs-6 m-2 text-light" style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{chapter.summary}</p>
      </div>
    </div>
    </div>
  );
};

export default MainVideoSummary;
