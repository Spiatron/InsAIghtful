import React from "react";
import CoursePage from "@/components/CoursePage";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import style from "@/styles/finalgeneration.module.css";
import ChatbotComponent from "@/components/ChatbotComponent";

const Page = async ({ params: { slug } }) => {
  const [courseSlug, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseSlug },
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
    return redirect("/");
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);
  const units = course.units;
  const unit = units[unitIndex];
  const chapter = unit.chapters[chapterIndex];
  const questions = chapter.questions;
  const summary = chapter.summary;

  return (
    <div className={style.finalgeneration}>
      <CoursePage
        course={course}
        unitIndex={unitIndex}
        chapterIndex={chapterIndex}
        chapter={chapter}
        questions={questions}
      />
      {/* Chat bot idher he */}
      <div>
        <ChatbotComponent summary={summary} />
      </div>
    </div>
  );
};

export default Page;
