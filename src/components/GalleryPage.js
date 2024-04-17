"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import GalleryCourseCard from "@/components/GalleryCourseCard";
import style from "@/styles/galleryPage.module.css";
import styles from "@/styles/Search.css";

const GalleryPage = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [courseList, setCourseList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      await courses.reverse(); // Reverse the order of courses
      setCourseList(courses);
      setLoading(false); // Update loading state
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

  // Filtering function to filter courses based on search term
  const filteredCourses = courseList.filter((course) =>
    course.name
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchTerm.toLowerCase().replace(/\s/g, ""))
  );

  // Render loading indicator if data is still being fetched
  if (loading) {
    return (
      <Link href={""} ref={linkButtonRef} style={{ display: "none" }}>
        Hidden Link
      </Link>
    );
  }

  return (
    <>
      <div className="SearchContainer container">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          name="text"
          className="SearchBar"
        />
      </div>
      <div>
        {/* Render filtered courses */}
        {filteredCourses.map((course) => (
          <GalleryCourseCard
            course={course}
            key={course.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default GalleryPage;
