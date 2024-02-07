"use client";
import React, { useState, useRef } from "react";
import style from "@/styles/Progressbar.module.css";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";

const Progressbar = ({
  courseId,
  unitIndex,
  chapterIndex,
  chapter,
  questions,
  extractedAnswers,
  extractedBooleans,
  increment,
  progress,
  courseProgress,
}) => {
  const [totalProgress, setTotalProgress] = useState(progress || 0);

  const chapterVideoDoneRef = useRef(
    new Map(
      courseProgress.map((prog) => [prog.chapterId, prog.videoDone || false])
    )
  );

  const chapterQuizDoneRef = useRef(
    new Map(
      courseProgress.map((prog) => [prog.chapterId, prog.quizDone || false])
    )
  );

  const handleVideoEnd = async () => {
    if (!chapterVideoDoneRef.current.get(chapter.id)) {
      try {
        const response = await fetch("/api/progress/getUserProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
            chapterId: chapter.id,
            videoDone: true,
          }),
        });

        if (!response.ok) {
          console.error("API call failed");
          return;
        }
        const newProgress = await (totalProgress + increment);
        setTotalProgress(newProgress);
        chapterVideoDoneRef.current.set(chapter.id, true);
      } catch (error) {
        console.error("Error during API call:", error);
      }
    }
  };
  const handleQuizEnd = async (answers) => {
    if (!chapterQuizDoneRef.current.get(chapter.id)) {
      const newProgress = await (totalProgress + increment);
      try {
        const response = await fetch("/api/progress/getUserProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: courseId,
            chapterId: chapter.id,
            quizDone: true,
            selectedAnswers: answers,
          }),
        });

        if (!response.ok) {
          console.error("API call failed");
          return;
        }
        setTotalProgress(newProgress);
        chapterQuizDoneRef.current.set(chapter.id, true);
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else {
      try {
        const response = await fetch("/progress/getUserProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedAnswers: answers,
          }),
        });

        if (!response.ok) {
          console.error("API call failed");
          return;
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    }
  };
  return (
    <div className={style.finalgeneration}>
      <div className="row">
        <div className={style.Progressbar}>
          <div className="container">
            <div
              className="progress"
              style={{ width: `100%` }}
              role="progressbar"
              aria-label="Animated striped example"
              aria-valuenow={`${totalProgress}`}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                style={{ width: `${totalProgress}%` }}
              >{parseInt(totalProgress)}%</div>
            </div>
          </div>
        </div>

        <div
          className="col-md-1 my-5 mx-5 "
          style={{ marginleft: "", padding: "", zIndex: 1000 }}
        >
          <MainVideoSummary
            unitIndex={unitIndex}
            chapter={chapter}
            chapterIndex={chapterIndex}
            onVideoEnd={handleVideoEnd}
          />
        </div>
      </div>
      <div className="w-50">
        <div
          className=" col-md-7 my-4 "
          style={{ marginLeft: "330px", zIndex: 1000 }}
        >
          <QuizCards
            questions={questions}
            extractedAnswers={extractedAnswers}
            extractedBooleans={extractedBooleans}
            onQuizEnd={handleQuizEnd}
          />
        </div>
      </div>
    </div>
  );
};
export default Progressbar;
