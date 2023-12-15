"use client";
import React from "react";
import ChapterCard from "./ChapterCard";
import Link from "next/link";

const ConfirmChapters = ({ course }) => {
  const [Loading, setLoading] = React.useState(false);
  const chapterRefs = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  const [completedChapters, setcompletedChapters] = React.useState(new Set());
  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);
  return (
    <div className="card container w-75 mt-2 rounded-3 text-white bg-dark-subtle col-form-label ">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="m-2">
            <h className="font-monospace text-body-secondary fs-5">Unit {unitIndex + 1}</h>
            <h4 className=" fw-bold fs-2 text-capitalize">{unit.name}</h4>
            <div>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setcompletedChapters={setcompletedChapters}
                    ref={chapterRefs[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="container d-inline-flex gap-3 col-form-label justify-content-center">
      <hr className="flex-grow-1 bg-secondary" />
        <Link href="/create" className="btn btn-light">Back</Link>
        {totalChaptersCount === completedChapters.size ? (
          <Link href={`/course/${course.id}/0/0`} className="btn btn-warning">Go to next step</Link>
        ) : (
          <button
          className="btn btn-warning"
            type="button"
            disabled={Loading}
            onClick={() => {
              setLoading(true);
              Object.values(chapterRefs).forEach((ref) => {
                ref.current?.triggerLoad();
              });
            }}
          >
            Generate
          </button>
        )}
        <hr className="flex-grow-1 bg-secondary " />
      </div>
    </div>
  );
};

export default ConfirmChapters;
