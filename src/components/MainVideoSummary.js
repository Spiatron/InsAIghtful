import React from "react";

const MainVideoSummary = ({ unit, unitIndex, chapter, chapterIndex }) => {
  return (
    <div>
      <h4>
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1>{chapter.name}</h1>
      <iframe
        title="chapter video"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div>
        <h3>Summary</h3>
        <p>{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
