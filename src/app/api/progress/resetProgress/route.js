import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId } = body;

  try {
    // Delete all UserProgress entries with the given courseId
    await prisma.userProgress.deleteMany({
      where: {
        courseId: courseId,
      },
    });
    // Delete selectedAnswer from all questions related to the course
    await prisma.question.updateMany({
      where: {
        chapter: {
          unit: {
            courseId: courseId,
          },
        },
      },
      data: {
        selectedAnswer: null,
      },
    });
    console.log(`User progress for course has been reset.`);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating user progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
