import React, { useState, useEffect, useMemo } from "react";
import styles from "@/styles/PopupStyles.css";

const ResultPopup = ({ courseId, onClose }) => {
  const [resultData, setResultData] = useState({});

  // Fetch result data from the server
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const response = await fetch("/api/result/calculateResult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId,
          }),
        });

        if (!response.ok) {
          console.error("Failed to fetch result data");
          return;
        }

        const data = await response.json();
        setResultData(data);
      } catch (error) {
        console.error("Error fetching result data:", error);
      }
    };

    fetchResultData();
  }, []);

  // Memoize rendering logic for chapters
  const renderChapters = useMemo(() => {
    return (chapters) => {
      return chapters.map((chapter) => (
        <div key={chapter.title}>
          <h4>{chapter.title}</h4>
          <p>Chapter Percentage: {chapter.percentage}</p>
        </div>
      ));
    };
  }, []);

  // Memoize rendering logic for units
  const renderUnits = useMemo(() => {
    return (units) => {
      return units.map((unit) => (
        <div key={unit.title}>
          <h3>{unit.title}</h3>
          <p>Unit Percentage: {unit.percentage}</p>
          {renderChapters(unit.chapters)}
        </div>
      ));
    };
  }, [renderChapters]);

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          x
        </button>
        <div className="popup-content">
          {/* Check if resultData exists and has at least one unit */}
          {resultData?.units && (
            <>
              <h2>{resultData.title}</h2>
              <p>Grade: {resultData.grade}</p>
              <p>Percentage: {resultData.percentage}</p>
              {/* Render units */}
              {renderUnits(resultData.units)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
