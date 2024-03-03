import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId, unitIndex, chapterIndex } = body;

  try {
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
        Progress: true,
      },
    });
    if (!course) {
      return redirect("/");
    }
    const units = course.units;
    const unit = units[unitIndex];
    const chapter = unit.chapters[chapterIndex];
    const questions = chapter.questions;
    const courseProgress = course.Progress;

    let chapterVideoDone = {};
    let chapterQuizDone = {};
    courseProgress.forEach((prog) => {
      chapterVideoDone[prog.chapterId] = prog.videoDone || false;
      chapterQuizDone[prog.chapterId] = prog.quizDone || false;
    });

    let extractedAnswers = {};
    let extractedBooleans = {};
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
    const currentProgress = dynamicIncrement * count;
    return NextResponse.json({
      success: true,
      progress: currentProgress,
      VideoDone: chapterVideoDone,
      QuizDone: chapterQuizDone,
      Answers: extractedAnswers,
      Booleans: extractedBooleans,
      Increment: dynamicIncrement,
    });
  } catch (error) {
    console.error("Error updating user progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
