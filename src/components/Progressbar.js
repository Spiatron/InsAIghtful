"use client";
import React, { useState, useRef } from "react";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import CourseSideBar from "@/components/CourseSideBar";

const Progressbar = ({
  course,
  currentChapterId,
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
    
    <>
    <div className="container-fluid">

      {/* Progress bar */}
      <div className="row">
        <div className="col-md-12 mt-4">
        
          <div className="container">
          <div className="progress" 
              style={{ width: `100%` }}
              role="progressbar"
              aria-label="Animated striped example"
              aria-valuenow={`${totalProgress}`}
              aria-valuemin="0"
              aria-valuemax="100"> 
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-warning text-black fw-bold"
                style={{ width: `${totalProgress}%` }}
              >{parseInt(totalProgress)}%</div>
            </div>
          </div>
        </div>
          </div>
        </div>
      
  

      <div className="row">
        {/* Course sidebar */}
        <div className="col-md-3 mt-4">
          <div className="">
            <CourseSideBar course={course} currentChapterId={currentChapterId} />
          </div>
        </div>
  
        {/* Main video summary */}
        <div className="col-md-6 mt-4">
          <div className="">
            <MainVideoSummary
              unitIndex={unitIndex}
              chapter={chapter}
              chapterIndex={chapterIndex}
              onVideoEnd={handleVideoEnd}
            />
          </div>
        </div>
  
        {/* Quiz card */}
        <div className="col-md-3 mt-4">
          <div className="">
            <QuizCards
              questions={questions}
              extractedAnswers={extractedAnswers}
              extractedBooleans={extractedBooleans}
              onQuizEnd={handleQuizEnd}
            />
          </div>
        </div>
      </div>
  </>
  );
};
export default Progressbar;
