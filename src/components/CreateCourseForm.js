"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChaptersSchema } from "@/validators/course";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import '../styles/fonts.module.css';
import { Stardos_Stencil } from "next/font/google";

const CreateCourseForm = () => {
  const router = useRouter()
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }) => {
      try {
        const response = await fetch("/api/course/createChapters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, units }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error creating chapters:", error.message);
        throw error;
      }
    },
  });
  const form = useForm({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data) {
    if (data.units.some((unit) => unit === "")) {
      alert("Please fill all the units");
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        alert("Success")
        router.push(`/create/${course_id}`)
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
  return (
    <div className="card container w-75 mt-3 rounded-3 text-dark bg-dark-subtle col-form-label " >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form-group row align-items-center">
          <label className=" col-form-label col-md-1 text-white font-monospace text-white font-monospace fs-4 mb-4  "><label htmlFor="title border-white ">Title: </label></label> {/* Added margin-bottom class here for tittle tag*/}
          <div className="col-md-11" >
            <input
              type="text"
              className="form-control bg-black mb-4" /* Added margin-bottom class here for tittle*/
              id="title"
              placeholder="Enter the main topic of your course (e.g: 'Java')"
              {...form.register("title")}
            />
          </div>
        </div>

        {form.watch("units").map((_, index) => {
          return (
            <div className="form-group row align-items-center " key={index}>
              <label htmlFor={`units.${index}`} className="col-form-label col-md-1 text-white font-monospace  mb-3 fw-bold">Unit {index + 1}</label>
              <div className="col-md-11">
                <input
                  key={index}
                  type="text"
                  className="form-control bg-black mb-3" /* Added margin-bottom class here for units*/
                  id="units"
                  placeholder="Now enter the subtopic of your course (e.g: 'OOP')"
                  {...form.register(`units.${index}`)}
                />
              </div>
            </div>
          );
        })}


        {/* BUTTONS */}
        <div className="container d-flex gap-2 col-form-label justify-content-start " style={{ fontFamily: "" }} > {/*col-form-label */}
          {/* <hr className="flex-grow-1 bg-secondary" /> */}
          <button
            className="btn btn-outline-success fs-6"
            style={{ color: "#3ACF3A", borderColor: "#3ACF3A" }}
            type="button"
            onClick={() => {
              form.setValue("units", [...form.watch("units"), ""]);
            }}
          >
            <svg className="m-1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg>
          </button>

          <button 
          className="btn btn-outline-danger  fs-6 "
            type="button"
            onClick={() => {
              form.setValue("units", form.watch("units").slice(0, -1));
            }}
          >
            <svg className="m-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          </button>

          <hr className="flex-grow-1 bg-secondary " />
          
          <button disabled={isLoading} type="submit" className="btn btn-warning fw-bold fs-6 ms-auto" style={{ fontFamily: "asul", color: "" }}>

            {/* <svg className="m-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
          </svg> */}
            Generate
          </button>
        </div>
      </form>
    </div>

  );
};

export default CreateCourseForm;
