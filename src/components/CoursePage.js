"use client";
import React from "react";
import CourseSideBar from "@/components/CourseSideBar";
import Progressbar from "@/components/Progressbar";
import style from "@/styles/finalgeneration.module.css";

const CoursePage = ({
  course,
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
  return (
    <div className={style.finalgeneration}>
      <div className="row">
        <div
          className="col-md-3 m-3 mt-4"
          style={{ margin: "", padding: "", zIndex: 1000 }}
        >
          <CourseSideBar course={course} currentChapterId={chapter.id} />
        </div>

        <Progressbar
          courseId={course.id}
          unitIndex={unitIndex}
          chapterIndex={chapterIndex}
          chapter={chapter}
          questions={questions}
          extractedAnswers={extractedAnswers}
          extractedBooleans={extractedBooleans}
          increment={increment}
          progress={progress}
          courseProgress={courseProgress}
        />

        {/* <div
          className="col-md-1 my-5 mx-5 "
          style={{ marginleft: "", padding: "", zIndex: 1000 }}
        >
          <MainVideoSummary
            unit={unit}
            unitIndex={unitIndex}
            chapter={chapter}
            chapterIndex={chapterIndex}
            onVideoEnd={handleVideoEnd} // Pass the callback to handle video end event
          />
        </div> */}
      </div>
      {/* <div className="w-50">
        <div
          className=" col-md-7 my-4 "
          style={{ marginLeft: "330px", zIndex: 1000 }}
        >
          <QuizCards chapter={chapter} />
        </div>
      </div> */}
    </div>
  );
};

export default CoursePage;
