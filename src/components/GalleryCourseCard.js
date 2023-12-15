import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "@/styles/GalleryCourseCard.module.css";


const GalleryCourseCard = async ({ course }) => {
  return (
    <>

      <div className={style.GalleryCourseCard}>
        <div className="card bg-dark border border-dark" >

          {/*This chunk of code is for course name & picture*/}
          <Link className="  font-monospace text-capitalize  text-decoration-none" href={`/course/${course.id}/0/0`}>

            <Image src={course.image || ""} className="card-img-top" width={300}
              height={300} alt="picture of the course" priority={true} />

            {/* put this (mt-5 p-5) for tag adjustment in below div and h3 */}
            <div className="card-img-overlay">
              <h3 className=""> <span className=" badge rounded-pill text-dark bg-white  bg-opacity-75  " >{course.name}</span></h3>
            </div>
          </Link>

          {/*This chunk of code is for units*/}
          <ul className=" list-group list-group-flush  ">
            <li className=" list-group-item bg-dark  ">
              <h5 className="text-light font-monospace " >Units:</h5>
              {course.units.map((unit, unitIndex) => {
                return (
                  <Link className="text-start btn btn-outline-success fw-bold m-1"
                    href={`/course/${course.id}/${unitIndex}/0`} key={unit.id}>
                    {unit.name}
                  </Link>);
              })}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default GalleryCourseCard;
