import { prisma } from "@/lib/db";
import React from "react";
import style from "@/styles/galleryPage.module.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import GalleryPage from "@/components/GalleryPage";

const Page = async () => {
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
        <GalleryPage courses={courses} />
      </div>
    </div>
  );
};

export default Page;
