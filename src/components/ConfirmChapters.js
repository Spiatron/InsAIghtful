"use client";
import React from "react";
import ChapterCard from "./ChapterCard";
import Link from "next/link";

const ConfirmChapters = ({ course }) => {
  const chapterRefs = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  console.log(chapterRefs);
  return (
    <div>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id}>
            <h2>Unit {unitIndex + 1}</h2>
            <h3>{unit.name}</h3>
            <div>
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
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
      <div>
        <Link href="/create">Back</Link>
        <button
          type="button"
          onClick={() => {
            Object.values(chapterRefs).forEach((ref) => {
              ref.current?.triggerLoad();
            });
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default ConfirmChapters;
