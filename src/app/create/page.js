import CreateCourseForm from "@/components/CreateCourseForm";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import style from "@/styles/coursepage.module.css";
import React from "react";
// import "src/styles/fonts.module.css";

const page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className={style.coursepage}>
      <div className="container mt-5 mb-5 ">
        <div className="mb-4" style={{ fontFamily: "stencil", color: "" }}>
          <h1 className="text-uppercase fw-bold ">Create Course</h1>
          <h5 className="text-capitalize">Through AI</h5>
        </div>
        <div
          className=" rounded-3 fs-4 container bg-dark-subtle text-white w-75"
          style={{ fontFamily: "asul", color: "" }}
        >
          {" "}
          {/* to make the background transperant use bg-transparent */}
          Enter in a course title, or what you want to learn about. Then enter a
          list of units, which are the specifics you want to learn. and our AI
          will generate a course for you!
        </div>
        <CreateCourseForm />
      </div>
    </div>
  );
};
export default page;
