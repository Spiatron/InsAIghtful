import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { courseId } = body;

  try {
    // Find the course by courseId
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
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
      console.log(`Course with ID ${courseId} not found.`);
      return;
    }

    let totalCourseQuestions = 0;
    let correctCourseAnswers = 0;

    const unitResults = [];

    // Iterate over each unit
    for (const unit of course.units) {
      let totalUnitQuestions = 0;
      let correctUnitAnswers = 0;

      const chapterResults = [];

      // Iterate over each chapter
      for (const chapter of unit.chapters) {
        let totalChapterQuestions = 0;
        let correctChapterAnswers = 0;

        // Iterate over each question
        for (const question of chapter.questions) {
          totalCourseQuestions++;
          totalUnitQuestions++;
          totalChapterQuestions++;

          // Compare answer with selectedAnswer
          if (question.answer === question.selectedAnswer) {
            correctCourseAnswers++;
            correctUnitAnswers++;
            correctChapterAnswers++;
          }
        }

        // Calculate percentage of correct answers for the chapter
        const chapterPercentage =
          totalChapterQuestions === 0
            ? 0
            : (correctChapterAnswers / totalChapterQuestions) * 100;

        // Push chapter result to array
        chapterResults.push({
          title: chapter.name,
          percentage: chapterPercentage.toFixed(2), // Round to 2 decimal places
        });
      }

      // Calculate percentage of correct answers for the unit
      const unitPercentage =
        totalUnitQuestions === 0
          ? 0
          : (correctUnitAnswers / totalUnitQuestions) * 100;

      // Push unit result to array
      unitResults.push({
        title: unit.name,
        percentage: unitPercentage.toFixed(2), // Round to 2 decimal places
        chapters: chapterResults.slice(), // Copy chapter results for the unit
      });
    }

    // Calculate percentage of correct answers for the course
    const coursePercentage =
      totalCourseQuestions === 0
        ? 0
        : (correctCourseAnswers / totalCourseQuestions) * 100;

    // Calculate grade based on percentage
    let grade = "";
    if (coursePercentage >= 90) {
      grade = "A+";
    } else if (coursePercentage >= 85) {
      grade = "A";
    } else if (coursePercentage >= 80) {
      grade = "A-";
    } else if (coursePercentage >= 75) {
      grade = "B+";
    } else if (coursePercentage >= 70) {
      grade = "B";
    } else if (coursePercentage >= 66) {
      grade = "B-";
    } else if (coursePercentage >= 63) {
      grade = "C+";
    } else if (coursePercentage >= 60) {
      grade = "C";
    } else if (coursePercentage >= 55) {
      grade = "C-";
    } else {
      grade = "F";
    }

    // Return the result object
    return NextResponse.json({
      title: course.name,
      grade: grade,
      percentage: coursePercentage.toFixed(2), // Round to 2 decimal places
      units: unitResults.slice(), // Copy unit results for the course
    });
  } catch (error) {
    console.error("Error calculating course result:", error);
    return new NextResponse(error, { status: 500 });
  }
}
