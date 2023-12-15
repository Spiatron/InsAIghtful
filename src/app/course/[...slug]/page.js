import CourseSideBar from "@/components/CourseSideBar";
import MainVideoSummary from "@/components/MainVideoSummary";
import QuizCards from "@/components/QuizCards";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import style from "@/styles/finalgeneration.module.css";

const page = async ({ params: { slug } }) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/gallery");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }

  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }

  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className={style.finalgeneration} >

      <div className="row">
        <div className="col-md-3 m-3 mt-4" style={{ margin: "", padding: "", zIndex: 1000 }}>
          <CourseSideBar course={course} currentChapterId={chapter.id} />
        </div>

        <div className="col-md-1 my-5 mx-5 "  style={{ marginleft: "" , padding: "", zIndex: 1000}}>

          <MainVideoSummary
            unit={unit}
            unitIndex={unitIndex}
            chapter={chapter}
            chapterIndex={chapterIndex}
          />
          {/* {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
            >
              <div className="">
                <span>Previous</span>
                <span>{prevChapter.name}</span>
              </div>
            </Link>
          )}
          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
            >
              <div>
                <span>Next</span>
                <span>{nextChapter.name}</span>
              </div>
            </Link>
          )} */}
        </div>
        
      </div>
      <div className="w-50">
        <div className=" col-md-7 my-4 " style={{ marginLeft: "330px", zIndex: 1000 }}>
          <QuizCards chapter={chapter} />
        </div>
      </div>
    </div>


  );
};

export default page;
