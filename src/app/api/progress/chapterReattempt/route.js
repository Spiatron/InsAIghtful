import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { chapterId } = body;

  try {
    // Update the found UserProgress entry, setting quizDone to null
    await prisma.userProgress.updateMany({
      where: {
        chapterId,
      },
      data: {
        quizDone: null,
      },
    });

    // Delete selectedAnswer from all questions related to the course
    await prisma.question.updateMany({
      where: {
        chapterId,
      },
      data: {
        selectedAnswer: null,
      },
    });

    console.log(`Progress for chapter has been reset.`);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating chapter progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
