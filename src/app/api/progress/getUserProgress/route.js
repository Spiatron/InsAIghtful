import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId, chapterId, videoDone, quizDone, selectedAnswers } = body;

  try {
    const existingProgress = await prisma.userProgress.findFirst({
      where: {
        courseId,
        chapterId,
      },
    });
    if (!existingProgress) {
      // If there's no existing record, create a new one
      await prisma.userProgress.create({
        data: {
          courseId,
          chapterId,
          videoDone,
          quizDone,
        },
      });
      if (selectedAnswers) {
        for (const [questionId, selectedAnswer] of Object.entries(
          selectedAnswers
        )) {
          await prisma.question.update({
            where: { id: questionId },
            data: { selectedAnswer },
          });
        }
      }
      console.log("User progress created successfully");

      return NextResponse.json({
        success: true,
      });
    } else {
      if (videoDone) {
        // If there's an existing record, update it
        await prisma.userProgress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            videoDone,
          },
        });
        console.log("New user video progress updated successfully");

        return NextResponse.json({
          success: true,
        });
      } else if (quizDone) {
        // If there's an existing record, update it
        await prisma.userProgress.update({
          where: {
            id: existingProgress.id,
          },
          data: {
            quizDone,
          },
        });

        for (const [questionId, selectedAnswer] of Object.entries(
          selectedAnswers
        )) {
          await prisma.question.update({
            where: { id: questionId },
            data: { selectedAnswer },
          });
        }
        console.log("New user quiz progress updated successfully");

        return NextResponse.json({
          success: true,
        });
      } else {
        for (const [questionId, selectedAnswer] of Object.entries(
          selectedAnswers
        )) {
          await prisma.question.update({
            where: { id: questionId },
            data: { selectedAnswer },
          });
        }

        console.log("New user selected answers updated successfully");

        return NextResponse.json({
          success: true,
        });
      }
    }
  } catch (error) {
    console.error("Error updating user progress:", error);
    return new NextResponse(error, { status: 500 });
  }
}
