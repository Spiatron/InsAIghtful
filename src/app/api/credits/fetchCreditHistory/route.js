import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }

    const historyEntries = await prisma.creditHistory.findMany({
      where: { userId: userId },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      historyEntries,
    });
  } catch (error) {
    console.error("Error fetching credit history: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
