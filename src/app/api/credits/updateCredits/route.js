import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const {
      userId,
      userRole,
      courseId = null,
      actionPerformed,
      credsToUpdate,
    } = await req.json();

    if (!userId || !userRole || !actionPerformed || !credsToUpdate) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 404 }
      );
    }

    let updatedData = {
      credits: {
        increment: credsToUpdate,
      },
    };

    if (credsToUpdate > 0 && userRole === "basic") {
      updatedData.role = "premium";
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        credits: true,
        role: true,
      },
    });

    await prisma.creditHistory.create({
      data: {
        userId,
        courseId,
        actionPerformed,
        creditUpdate: credsToUpdate,
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
