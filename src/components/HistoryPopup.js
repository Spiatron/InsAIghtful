import React, { useState, useEffect } from "react";
import styles from "@/styles/PopupStyles.css";
import { X } from "lucide-react";

const HistoryPopup = ({ chapterId, chapterName, onClose }) => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch("/api/result/getHistory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chapterId,
          }),
        });

        if (!response.ok) {
          console.error("Failed to fetch history data");
          return;
        }

        const data = await response.json();
        setHistoryData(data.historyEntries);
        setIsLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="popup-background">
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-content">
            <div>
              <h2>{chapterName}</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : historyData.length === 0 ? (
                <p>No history found</p>
              ) : (
                historyData.map((entry, index) => (
                  <div key={entry.id}>
                    <p>Attempt {index + 1}</p>
                    <p>
                      You got {entry.correct} out of 3 answers correct and your
                      chapter score was {((entry.correct / 3) * 100).toFixed(2)}%
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="popup-closebtn-position">
            <button className="popup-closebtn" onClick={onClose}>
              <X
                className="popup-icon"
                size={30}
                strokeWidth={3}
                absoluteStrokeWidth
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPopup;
