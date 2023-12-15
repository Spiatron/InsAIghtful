import React from "react";
import '../styles/fonts.module.css';

const MainVideoSummary = ({ unit, unitIndex, chapter, chapterIndex }) => {
  return (
    <div className=" bg-opacity-50  rounded-4 p-3" style={{ height: "60%", width: "75rem" }}>
      <h5 className="fs-4" style={{ fontFamily: "asul", color: "#C3CED6" }}>Unit#{unitIndex +1} &bull; Chapter-{chapterIndex +1}
      </h5>
      <h5 className="fs-1 text-start text-capitalize fw-bold  p-1" style={{ fontFamily: "angrybird", color: "#DEDEDE" }}>{chapter.name}</h5>
      <iframe
        title="chapter video"
        className="rounded-4"
        height= "120%" 
        width= "100%"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div>
        <h3 className="fs-3 mt-2" style={{ fontFamily: "asul", color: "#C3CED6" }}>Summary:</h3>
        <p className="fs-6 text-start" >Lorem Ipsum{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
