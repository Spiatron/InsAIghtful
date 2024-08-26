import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { userEmail, credsToUpdate } = await req.json();

    if (!userEmail || !credsToUpdate) {
        return NextResponse.json(
            { success: false, error: "Required field missing" },
            { status: 404 }
          );
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { email: userEmail },
      data: {
        credits: user.credits + credsToUpdate,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating credits:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
