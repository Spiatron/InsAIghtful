"use client";
import React from "react";
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
      <div>

        <Progressbar
         course={course} currentChapterId={chapter.id}
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
      </div>
    </div>
  );
};

export default CoursePage;
