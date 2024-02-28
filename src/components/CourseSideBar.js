import Link from "next/link";
import React, { useMemo } from "react";
import "../styles/fonts.module.css";

const CourseSideBar = ({
  course,
  currentChapterId,
  chapterVideoDone,
  chapterQuizDone,
}) => {
  const updatedList = course.units.map((unit, unitIndex) => {
    return (
      <div className="m-1" key={unit.id}>
        <hr className="flex-grow-0 bg-light" />
        <h5
          className="text-uppercase text-secondary fw-bold fs-6 text-start"
          style={{ fontFamily: "asul", color: "" }}
        >
          Unit#{unitIndex + 1}
        </h5>
        <h5
          className="text-capitalize fs-5 fw-bold text-start"
          style={{ fontFamily: "asul", color: "#C0C2C9" }}
        >
          {unit.name}
        </h5>
        {unit.chapters.map((chapter, chapterIndex) => {
          const chapterId = chapter.id;
          const videoDone = chapterVideoDone[chapterId] || false;
          const quizDone = chapterQuizDone[chapterId] || false;
          const isChapterCompleted = videoDone && quizDone;

          return (
            <div key={chapter.id}>
              <Link
                className="text-decoration-none fw-bold lh-sm fs-6"
                style={{
                  fontWeight:
                    chapter.id === currentChapterId ? "900" : "normal",
                  color: isChapterCompleted
                    ? "#800080"
                    : chapter.id === currentChapterId
                    ? "#228B22"
                    : "#A7B8C3",
                  fontFamily: "quando",
                }}
                href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
              >
                {chapter.name}
              </Link>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div
      className=" mb-5 bg-black lh-1 bg-opacity-50 rounded-4 p-3"
      style={{ height: "", width: "" }}
    >
      <h5
        className="fs-1 text-center text-capitalize fw-bold p-2"
        style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
      >
        {course.name}
      </h5>
      {updatedList}
    </div>
  );
};

export default CourseSideBar;
