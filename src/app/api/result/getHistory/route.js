import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { chapterId } = body;

  try {
    // Retrieve all entries with a certain chapterId
    const historyEntry = await prisma.chapterHistory.findFirst({
      where: {
        chapterId,
      },
    });

    if (!historyEntry) {
      console.log(`No history found`);
      // Return a response indicating no history found
      return NextResponse.json({ message: "No history found" });
    }

    // Return the result object
    return NextResponse.json({
      historyEntry: historyEntry.correctAnswers,
    });
  } catch (error) {
    console.error("Error fetching chapter history: ", error);
    return new NextResponse(error, { status: 500 });
  }
}
