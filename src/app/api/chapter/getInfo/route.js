import { prisma } from "@/lib/db";
import { z } from "zod";
import { getTranscript, searchYouTube } from "@/lib/youtube";
import {
  generateQuestionsFromTranscript,
  generateSummaryFromTranscript,
} from "@/lib/aiutils";
import { NextResponse } from "next/server";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        { status: 404 }
      );
    }

    const videoId = await searchYouTube(chapter.youtubeSearchQuery);
    console.log(videoId);
    let transcript = await getTranscript(videoId);

    const { questions } = await generateQuestionsFromTranscript(
      chapter.name,
      transcript
    );

    const { summary } = await generateSummaryFromTranscript(
      chapter.name,
      transcript
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];

        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        videoId: videoId,
        summary: summary,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        console.log(error),
        {
          success: false,
          error: error,
        },
        { status: 500 }
      );
    }
  }
}
