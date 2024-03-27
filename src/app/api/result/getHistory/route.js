import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { chapterId } = body;

  try {
    // Retrieve all entries with a certain chapterId
    const historyEntries = await prisma.history.findMany({
      where: {
        chapterId,
      },
    });

    if (!historyEntries) {
      console.log(`No history found`);
      return;
    }

    // Return the result object
    return NextResponse.json({
        historyEntries,
    });
  } catch (error) {
    console.error("Error fetching chapter history: ", error);
    return new NextResponse(error, { status: 500 });
  }
}
