"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChaptersSchema } from "@/validators/course";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
      onSuccess: ({course_id}) => {
        alert("Success")
        router.push(`/create/${course_id}`)
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Title"
            {...form.register("title")}
          />
        </div>

        {form.watch("units").map((_, index) => {
          return (
            <div className="form-group" key={index}>
              <label htmlFor="units">Unit {index + 1}</label>
              <input
                key={index}
                type="text"
                className="form-control"
                id="units"
                placeholder="Enter Unit"
                {...form.register(`units.${index}`)}
              />
            </div>
          );
        })}

        <div>
          <button
            type="button"
            onClick={() => {
              form.setValue("units", [...form.watch("units"), ""]);
            }}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              form.setValue("units", form.watch("units").slice(0, -1));
            }}
          >
            Remove
          </button>
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          Lets Go!
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
