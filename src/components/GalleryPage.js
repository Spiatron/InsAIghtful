"use client";
import Link from "next/link";
import GalleryCourseCard from "@/components/GalleryCourseCard";
import React, { useState, useEffect, useRef } from "react";
import style from "@/styles/galleryPage.module.css";
import Search from "./Search";

const GalleryPage = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState();

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/course/fetchCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });

      if (!response.ok) {
        console.error("API call failed");
        return;
      }

      const { courses } = await response.json();
      await courses.reverse();
      setCourseList(courses);
      // Update loading state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    linkButtonRef.current.click();
    fetchCourses();
  }, []);

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
      // Update the state to remove the deleted course
      setCourseList((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const linkButtonRef = useRef();

  // Render loading indicator if data is still being fetched
  if (loading) {
    return (
      <Link href={""} ref={linkButtonRef} style={{ display: "none" }}>
        Hidden Link
      </Link>
    );
  }

  return (
    <div>
      <Search courses={courseList}/>

      {courseList.map((course) => {
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
