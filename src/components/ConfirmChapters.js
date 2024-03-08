"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ChapterCard from "./ChapterCard";
import Link from "next/link";

const ConfirmChapters = ({ course }) => {
  const [Loading, setLoading] = useState(false);
  const chapterRefs = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = useRef(null);
    });
  });
  const [completedChapters, setcompletedChapters] = useState(new Set());
  const totalChaptersCount = useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);
  useEffect(() => {
    console.log(completedChapters, totalChaptersCount);
    if (completedChapters.size === totalChaptersCount) {
      setLoading(false);
    }
  }, [totalChaptersCount, completedChapters]);
  return (
    <div className="card container w-75 mt-2 mb-5 rounded-3 text-white bg-dark-subtle col-form-label ">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unitIndex} className="m-2">
            <h1 className=" text-body-secondary fs-5" style={{ fontFamily: "asul", fontWeight:"bold"}}>
              Unit {unitIndex + 1}
            </h1>
            <h4 className=" fw-bold fs-2 text-capitalize">{unit.name}</h4>
            <div>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setcompletedChapters={setcompletedChapters}
                    ref={chapterRefs[chapter.id]}
                    key={chapterIndex}
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
        <hr className="flex-grow-1 bg-secondary " />
        <Link href="/create" className="btn btn-light fw-bold">
          Back
        </Link>
        {totalChaptersCount === completedChapters.size ? (
          <Link
            href={`/course/${course.id}/0/0`}
            className="btn btn-warning fw-bold"
          >
            Go to next step
          </Link>
        ) : (
          <button
            className="btn btn-warning fw-bold"
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
        <hr className="flex-grow-1 bg-secondary" />
      </div>
    </div>
  );
};

export default ConfirmChapters;
