import Link from "next/link";
import React from "react";

const CourseSideBar = async ({ course, currentChapterId }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id}>
            <h2> Unit {unitIndex + 1}</h2>
            <h2>{unit.name}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    style={{
                      fontWeight:
                        chapter.id === currentChapterId ? "900" : "normal",
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
      })}
    </div>
  );
};

export default CourseSideBar;
