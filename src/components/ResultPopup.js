import React, { useState, useEffect, useMemo } from "react";
import styles from "@/styles/PopupStyles.css";
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const ResultPopup = ({ courseId, onClose }) => {
  const [resultData, setResultData] = useState({});

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

  // Toggle function for toggling the chapters
  const toggleUnitDetails = (index) => {
    setResultData(prevState => {
      const updatedUnits = [...prevState.units];
      updatedUnits[index] = { ...updatedUnits[index], showDetails: !updatedUnits[index].showDetails };
      return { ...prevState, units: updatedUnits };
    });
  };

  // Memoize rendering logic for chapters
  const renderChapters = useMemo(() => {
    return (chapters) => {
      return chapters.map((chapter) => (
        <div className="margin" key={chapter.title}>
          <button className="chapter-title">{chapter.title}</button>
          <button className="chapter-unit"> {chapter.percentage}%</button>
        </div>
      ));
    };
  }, []);

  // Memoize rendering logic for units
  const renderUnits = useMemo(() => {
    return (units) => {
      return units.map((unit, index) => (
        <div className=" m-1" style={{ fontFamily: "quando", color: "", fontWeight: "bold" }} key={unit.title}>
          <button className="unit-title" onClick={() => toggleUnitDetails(index)}>{unit.title}
          </button>
          <button className="dropdown" onClick={() => toggleUnitDetails(index)}>
            {unit.showDetails ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
          </button>
          <button className="unit-percentage"> {unit.percentage}%</button>
          {unit.showDetails && renderChapters(unit.chapters)}
        </div>
      ));
    };
  }, [renderChapters]);


  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            {resultData?.units && (
              <>
                <h1 className="button" style={{ fontFamily: "Kufi", color: "", fontWeight: "", fontSize: "" }}>
                  <span className="button_lg">
                    <span className="button_sl"></span>
                    <span className="button_text"> {resultData.title}</span>
                  </span>
                </h1>
                <div className="button-position">
                  <p>
                    <button className="popup-grade me-3">
                      <span className="span" style={{ fontFamily: "quando", color: "", fontWeight: "", fontSize: "22px" }}> Grade: {resultData.grade}</span>
                    </button>
                  </p>
                  <p>
                    <button className="popup-grade">
                      <span className="span" style={{ fontFamily: "quando", color: "", fontWeight: "", fontSize: "22px" }}>Score: {resultData.percentage}% </span>
                    </button>
                  </p>
                </div>
                {/* Render units */}
                {renderUnits(resultData.units)}
              </>
            )}
          </div>
          <div className="popup-closebtn-position">
            <button className="popup-closebtn" onClick={onClose}>
              <X className="popup-icon" size={30} strokeWidth={3} absoluteStrokeWidth />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
