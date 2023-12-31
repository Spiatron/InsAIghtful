import Link from "next/link";
import React from "react";
import "../styles/fonts.module.css";

const CourseSideBar = async ({ course, currentChapterId }) => {
  return (
    <div
      className=" bg-black lh-1 bg-opacity-50  rounded-4 p-3"
      style={{ height: "", width: "130%" }}
    >
      <h5
        className="fs-1 text-center text-capitalize fw-bold  p-2 "
        style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
      >
        {course.name}
      </h5>

      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id}>
            <hr className="flex-grow-0 bg-light" />
            <h5
              className="text-uppercase text-secondary fw-bold fs-6 text-start  "
              style={{ fontFamily: "asul", color: "" }}
            >
              {" "}
              Unit#{unitIndex + 1}
            </h5>
            <h5
              className="text-capitalize fs-5 fw-bold text-start"
              style={{ fontFamily: "asul", color: "#C0C2C9" }}
            >
              {unit.name}
            </h5>

            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    className="text-decoration-none  fw-bold lh-sm fs-6"
                    style={{
                      fontWeight:
                        chapter.id === currentChapterId ? "900" : "normal",
                      color:
                        chapter.id === currentChapterId ? "#228B22" : "#A7B8C3",
                      fontFamily: "quando", //for custom fonts for chapters
                    }}
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                  >
                    {" "}
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CourseSideBar;
