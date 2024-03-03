import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { userId } = await req.json();

  try {
    const courses = await prisma.course.findMany({
      where: {
        userId,
      },
      include: {
        units: {
          include: {
            chapters: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      courses: courses,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new NextResponse(error, { status: 500 });
  }
}
