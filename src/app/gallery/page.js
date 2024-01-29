import GalleryCourseCard from "@/components/GalleryCourseCard";
import { prisma } from "@/lib/db";
import React from "react";
import style from "@/styles/galleryPage.module.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  courses.reverse();
  return (
    <div className={style.galleryPage}>
      <div>
        <div>
          {courses.map((course) => {
            return <GalleryCourseCard course={course} key={course.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
