import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId } = body;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        units: {
          include: {
            chapters: true,
          },
        },
        Progress: true,
      },
    });
    if (!course) {
      return redirect("/");
    }
    const units = course.units;
    const courseProgress = course.Progress;

    let chapterVideoDone = {};
    let chapterQuizDone = {};
    courseProgress.forEach((prog) => {
      chapterVideoDone[prog.chapterId] = prog.videoDone || false;
      chapterQuizDone[prog.chapterId] = prog.quizDone || false;
    });

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
    });
  } catch (error) {
    console.error("Error updating user progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
