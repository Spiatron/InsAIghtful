import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const {
      userId,
      userRole,
      courseId,
      courseName,
      credsToUpdate,
    } = await req.json();

    if (!userId || !userRole || !courseId || !courseName || !credsToUpdate) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 404 }
      );
    }

    let updateData = {
      credits: {
        increment: credsToUpdate,
      },
    };

    if (credsToUpdate > 0 && user.role === "basic") {
      updateData.role = "premium";
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: credsToUpdate,
        },
      },
      select: {
        credits: true,
        role: true,
      },
    });

    await prisma.creditHistory.create({
      data: {
        userId: userId,
        courseId: courseId,
        courseName: courseName,
        creditUpdate: credsToUpdate,
        date: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      updatedCredits: updatedUser.credits,
      updatedRole: updatedUser.role,
    });
  } catch (error) {
    console.error("Error updating credits: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
