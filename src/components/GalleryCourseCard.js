import Image from "next/image";
import Link from "next/link";
import React from "react";

const GalleryCourseCard = async ({ course }) => {
  return (
    <>
      <div>
        <div>
          <Link href={`/course/${course.id}/0/0`}>
            <Image
              src={course.image || ""}
              width={300}
              height={300}
              alt="picture of the course"
              priority={true}
            />
            <hr />
            <span>{course.name}</span>
            <hr />
          </Link>
        </div>
        <div>
          <h4>Units</h4>
          <div>
            {course.units.map((unit, unitIndex) => {
              return (
                <Link
                  href={`/course/${course.id}/${unitIndex}/0`}
                  key={unit.id}
                >
                  <hr />
                  {unit.name}
                  <hr />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryCourseCard;
