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
      <div>
        <Link href="/create">Back</Link>
        {totalChaptersCount === completedChapters.size ? (
          <Link href={`/course/${course.id}/0/0`}>Go to next step</Link>
        ) : (
          <button
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
      </div>
    </div>
  );
};

export default ConfirmChapters;
