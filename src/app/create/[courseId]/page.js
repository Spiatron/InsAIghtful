import ConfirmChapters from "@/components/ConfirmChapters";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import style from "@/styles/confirmcoursepage.module.css";

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
      <div className={style.confirmcoursepage}>
        <div className="container mt-4" style={{ fontFamily: "asul", color: "" }}>
        <h className="fs-4" style={{ fontFamily: "stencil", color: "" }}>COURSE NAME</h>
        <h1 className="text-uppercase fw-bold" style={{ fontFamily: "stencil", color: "" }}>{course.name}</h1>
        <div className="rounded-3 fs-4 container bg-dark-subtle text-white w-75" >
        We generated chapters for each of your units. Look over them and then click the "Finish Course Generation" button to confirm and continue.
        </div>
        <ConfirmChapters course={course}/>
        </div>
      </div>
    </>
  );
};
export default CreateChapters;
