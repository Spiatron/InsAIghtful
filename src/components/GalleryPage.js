"use client";
import GalleryCourseCard from "@/components/GalleryCourseCard";
import React from "react";
import style from "@/styles/galleryPage.module.css";

const GalleryPage = ({ courses }) => {
  const handleDelete = async (courseId) => {
    try {
      const response = await fetch("/api/course/deleteCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
      });
      if (!response.ok) {
        console.error("API call failed");
        return;
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div>
      {courses.map((course) => {
        return (
          <GalleryCourseCard
            course={course}
            key={course.id}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default GalleryPage;
