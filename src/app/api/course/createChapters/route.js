import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateCoursePlaylist, generateImageSearchTerm } from "@/lib/aiutils";
import { getUnsplashImage } from "@/lib/unsplash";
import { createChaptersSchema } from "@/validators/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req, res) {
  const session = await getAuthSession();
  try {
    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    const output_units = await generateCoursePlaylist(title, units);

    const { image_search_term } = await generateImageSearchTerm(title);

    const course_image = await getUnsplashImage(image_search_term);

    const course = await prisma.course.create({
      data: {
        userId: session.user.id,
        name: title,
        image: course_image,
      },
    });

    for (const unit of output_units.units) {
      const title = unit.title;
      // using regex to remove things like "Unit 1: " from the title
      const regex = /Unit \d+: /;
      const unitTitle = title.replace(regex, "");
      const prismaUnit = await prisma.unit.create({
        data: {
          name: unitTitle,
          courseId: course.id,
        },
      });

      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    return NextResponse.json({
      course_id: course.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    } else {
      return new NextResponse(error, { status: 500 });
    }
  }
}
