import { prisma } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYouTube,
} from "@/lib/youtube";
import { strict_output } from "@/lib/gpt";
// import { strictAI } from "@/lib/ai";

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

    // const {summary} = await strict_output(
    //   "You are an AI capable of summarising a youtube transcript.",
    //   "Summarise in 300 words or less and do not talk of the sponsors or anything unrelated to the main topic, also do not introduce what the summary is about. Make sure that the summary is in correct JSON format. \n" +
    //     transcript,
    //   { summary: "summary of the transcript" }
    // );

    // // console.log(summary);

    // if (!summary) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Summary not found",
    //     },
    //     { status: 404 }
    //   );
    // }

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    const questions_result = questions.some((question) => {
      return !question.option1 || !question.option2 || !question.option3;
    });

    if (questions_result) {
      return NextResponse.json(
        {
          success: false,
          error: "Options not found",
        },
        { status: 404 }
      );
    }

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
        // summary: summary,
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
