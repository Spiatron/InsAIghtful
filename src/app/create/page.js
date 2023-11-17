import CreateCourseForm from "@/components/CreateCourseForm";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  return (
    <div>
      <h1>AI FYP</h1>
      <CreateCourseForm />
    </div>
  );
};

export default page;
