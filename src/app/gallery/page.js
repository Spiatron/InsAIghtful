import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  return (
    <div>
        <div>
            {courses.map(course => {
                return <GalleryCourseCard course={course} key={course.id} />
            })}
        </div>
    </div>
  )
};

export default page;
