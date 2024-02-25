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
      Progress: true,
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
  const courseProgress = course.Progress;
  const summary = chapter.summary;

  const extractedAnswers = {};
  const extractedBooleans = {};
  for (const question of questions) {
    if (question.selectedAnswer == null) {
      break;
    }
    extractedAnswers[question.id] = question.selectedAnswer;
    const isCorrect = question.selectedAnswer == question.answer;
    extractedBooleans[question.id] = isCorrect;
  }

  let totalChapters = 0;
  for (const currentUnit of units) {
    totalChapters += currentUnit.chapters.length;
  }
  let count = 0;
  for (const item of courseProgress) {
    if (item.quizDone === true) {
      count++;
    }
    if (item.videoDone === true) {
      count++;
    }
  }
  const dynamicIncrement = 100 / (totalChapters * 2);

  return (
    <div className={style.finalgeneration}>
      <CoursePage
        course={course}
        unitIndex={unitIndex}
        chapterIndex={chapterIndex}
        chapter={chapter}
        extractedAnswers={extractedAnswers}
        extractedBooleans={extractedBooleans}
        questions={questions}
        increment={dynamicIncrement}
      />
      {/* Chat bot idher he */}
      <div>
        <ChatbotComponent summary={summary} />
      </div>
    </div>
  );
};

export default Page;
