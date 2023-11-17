import ConfirmChapters from "@/components/ConfirmChapters";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const CreateChapters = async ({ params: { courseId } }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <>
      <div>
        <h5>COURSE NAME</h5>
        <h1>{course.name}</h1>
      </div>
      <div>
        <ConfirmChapters course={course}/>
      </div>
    </>
  );
};

export default CreateChapters;

// http://localhost:3000/create/clozws1mf000qbw31gpf5llji
