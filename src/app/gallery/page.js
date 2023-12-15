import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";
import style from "@/styles/galleryPage.module.css";

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
    <div className={style.galleryPage}>
    <div>
        <div>
            {courses.map(course => {
                return <GalleryCourseCard course={course} key={course.id} />
            })}
        </div>
    </div>
    </div>
  )
};

export default page;
