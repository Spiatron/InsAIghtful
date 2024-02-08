"use client";
import React, { useState, useRef } from "react";
import style from "@/styles/Progressbar.module.css";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import CourseSideBar from "@/components/CourseSideBar";
// import styles from '@/styles/MainVideoSummaryStyles.css';

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
        <div className={style.Progressbar}>
          <div className="">
          <div className="container progress" 
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
  
  // <div className="container-fluid">
  // {/* Progress bar */}
  // <div className="row">
  //   <div className="col-md-12 mt-4">
  //   <div className={style.Progressbar}>
  //     <div className="border border-danger">
  //     <div className=" container progress border border-warning" 
  //         style={{ width: `100%` }}
  //         role="progressbar"
  //         aria-label="Animated striped example"
  //         aria-valuenow={`${totalProgress}`}
  //         aria-valuemin="0"
  //         aria-valuemax="100"> 
  //         <div
  //           className="progress-bar progress-bar-striped progress-bar-animated bg-warning text-black fw-bold"
  //           style={{ width: `${totalProgress}%` }}
  //         >{parseInt(totalProgress)}%</div>
  //       </div>
  //     </div>
  //   </div>

        
  //       {/* Your progress bar content goes here */}
  //     </div>
  //   </div>
  // </div>

  // {/* Main content */}
  // <div className="row">
  //   {/* Course sidebar */}
  //   <div className="col-md-3 mt-4">
  //     <div className="border border-danger">
  //       <CourseSideBar course={course} currentChapterId={currentChapterId} />
  //     </div>
  //   </div>

  //   {/* Main video summary */}
  //   <div className="col-md-6 mt-4">
  //     <div className="border border-danger">
  //       <MainVideoSummary
  //         unitIndex={unitIndex}
  //         chapter={chapter}
  //         chapterIndex={chapterIndex}
  //         onVideoEnd={handleVideoEnd}
  //       />
  //     </div>
  //   </div>

  //   {/* Quiz card */}
  //   <div className="col-md-3 mt-4">
  //     <div className="border border-danger">
  //       <QuizCards
  //         questions={questions}
  //         extractedAnswers={extractedAnswers}
  //         extractedBooleans={extractedBooleans}
  //         onQuizEnd={handleQuizEnd}
  //       />
  //     </div>
  //   </div>
  // </div>
    
    
    
    
    
    
    
    
    
























    
    
    
    
    
    
    
    // <>
    // coursesidebar
    //   <div className="">
    //   <div className="col-md-3 m-3 mt-4 border border-danger">
    //       <CourseSideBar course={course} currentChapterId={currentChapterId} />
    //     </div>

    //     {/* progress */}
    //     <div className={style.Progressbar}>
    //       <div className=" border border-danger"> {/* above progress bar border */}
    //         {/* progressbar itself border */}
    //         <div className=" container progress border border-warning" 
    //           style={{ width: `100%` }}
    //           role="progressbar"
    //           aria-label="Animated striped example"
    //           aria-valuenow={`${totalProgress}`}
    //           aria-valuemin="0"
    //           aria-valuemax="100"> 
    //           <div
    //             className="progress-bar progress-bar-striped progress-bar-animated bg-warning text-black fw-bold"
    //             style={{ width: `${totalProgress}%` }}
    //           >{parseInt(totalProgress)}%</div>
    //         </div>
    //       </div>
    //     </div>


    //     {/* Video and summary */}
    //     {/* above mainVideo border */}
    //     <div className="border border-danger"
    //       style={{ marginleft: "", padding: "", zIndex: 999 }}
    //     >
    //       <MainVideoSummary
    //         unitIndex={unitIndex}
    //         chapter={chapter}
    //         chapterIndex={chapterIndex}
    //         onVideoEnd={handleVideoEnd}
    //       />
    //     </div>
       
       

    //   {/* quiz card */}
    //     <div className="">
    //     <div
    //     className=" col-md-7 my-4 border border-danger"
    //     style={{ marginLeft: "330px", zIndex: 1000 }}
    //     >
    //     <QuizCards
    //     questions={questions}
    //     extractedAnswers={extractedAnswers}
    //     extractedBooleans={extractedBooleans}
    //     onQuizEnd={handleQuizEnd}
    //     />
    //     </div>
    //   </div>
    //   </div>
    //   </>
  );
};
export default Progressbar;
