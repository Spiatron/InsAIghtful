"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChaptersSchema } from "@/validators/course";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../styles/fonts.module.css";
import Link from "next/link";
import CC_DeleteBtnStyles from "@/styles/CC_DeleteBtnStyles.css";
import CC_AddBtnStyles from "@/styles/CC_AddBtnStyles.css";
import style from "@/styles/buttons/buttonClick.module.css";
import { X } from "lucide-react";
import { Plus } from "lucide-react";

const CreateCourseForm =  ({ session }) => {
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

  const [generatedHref, setGeneratedHref] = useState("");
  const linkButtonRef = useRef();

  useEffect(() => {
    if (generatedHref) {
      linkButtonRef.current.click();
    }
  }, [generatedHref]);

  const checkCreditsAndSubmit = (data) => {
    // Check if the user has enough credits
    if (session.user.credits < 1) {
      alert(
        "Your credits are low. You need a minimum of 1 credit to continue. Kindly buy more credits."
      );
      return; // Prevent form submission
    }

    // Proceed with submission if credits are sufficient
    onSubmit(data);
  };

  async function onSubmit(data) {
    if (data.units.some((unit) => unit === "")) {
      alert("Please fill all the units");
      return;
    }
    setGeneratedHref("#");
    createChapters(data, {
      onSuccess: async ({ course_id }) => {
        // Generate the href based on the course_id
        const href = `/create/${course_id}`;
        setGeneratedHref(href);

        try {
          // Make an API call to update the user's credits
          const updateResponse = await fetch("/api/credits/updateCredits", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,  
              userRole: session.user.role,
              courseId: course_id,
              courseName: data.title,
              credsToUpdate: -1, // Deduct 1 credit
            }),
          });

          if (!updateResponse.ok) {
            throw new Error(`Credit update failed. Status: ${updateResponse.status}`);
          }
          const updateData = await updateResponse.json();
          if (updateData.success) {
            console.log(`Course created successfully! Your remaining credits: ${updateData.updatedCredits}`);
            session.user.credits = updateData.updatedCredits
          } else {
            console.error("Failed to update credits:", updateData.error);
          }
        } catch (error) {
          console.error("Error updating credits:", error.message);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="card container w-75 mt-3 rounded-3 text-dark bg-dark-subtle col-form-label ">
      <form onSubmit={form.handleSubmit(checkCreditsAndSubmit)}>
        <div className="form-group row align-items-center">
          <label className=" col-form-label col-md-1 text-white font-monospace text-white font-monospace fs-4 mb-4  ">
            <label htmlFor="title border-white" style={{ fontFamily: "quando" }}>Title: </label>
          </label>{" "}
          <div className="col-md-11">
            <input
              type="text"
              className="form-control bg-black mb-4"
              id="title"
              placeholder="Enter the main topic of your course (e.g: 'Java')"
              {...form.register("title")}
            />
          </div>
        </div>

        {form.watch("units").map((_, index) => (
          <div className="form-group row align-items-center " key={index}>
            <label
              htmlFor={`units.${index}`}
              className="col-form-label col-md-1 text-white  mb-3"
              style={{ fontFamily: "quando" }}
            >
              Unit {index + 1}
            </label>
            <div className="col-md-11">
              <input
                key={index}
                type="text"
                className="form-control bg-black mb-3"
                id="units"
                placeholder="Now enter the subtopic of your course (e.g: 'OOP')"
                {...form.register(`units.${index}`)}
              />
            </div>
          </div>
        ))}

        {/* BUTTONS */}
        <div
          className="container d-flex gap-2 col-form-label justify-content-start "
          style={{ fontFamily: "chillax" }}
        >
          {" "}
          <button
            type="button"
            className="addbutton"
            onClick={() => {
              form.setValue("units", [...form.watch("units"), ""]);
            }}
          >
            <span className="button__text">Add</span>
            <span className="button__icon">
              <Plus />
            </span>
          </button>
          <button
            type="button"
            className="delbutton"
            onClick={() => {
              form.setValue("units", form.watch("units").slice(0, -1));
            }}
          >
            <span className="button__text">Delete</span>
            <span className="button__icon">
              <X />
            </span>
          </button>
          <hr className="flex-grow-1 bg-secondary " />
          <button
            disabled={isLoading}
            type="submit"
            className={style.button}
            style={{ fontFamily: "vast", color: "", fontWeight: "bold" }}
          >
            Generate
          </button>
        </div>
      </form>
      <Link
        href={generatedHref}
        ref={linkButtonRef}
        style={{ display: "none" }}
      >
        Hidden Link
      </Link>
    </div>
  );
};
export default CreateCourseForm;








// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createChaptersSchema } from "@/validators/course";
// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import "../styles/fonts.module.css";
// import Link from "next/link";
// import CC_DeleteBtnStyles from "@/styles/CC_DeleteBtnStyles.css";
// import CC_AddBtnStyles from "@/styles/CC_AddBtnStyles.css";
// import style from "@/styles/buttons/buttonClick.module.css";
// import { X } from "lucide-react";
// import { Plus } from "lucide-react";

// const CreateCourseForm =  ({ session }) => {
//   const { mutate: createChapters, isLoading } = useMutation({
//     mutationFn: async ({ title, units }) => {
//       try {
//         const response = await fetch("/api/course/createChapters", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ title, units }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error("Error creating chapters:", error.message);
//         throw error;
//       }
//     },
//   });
//   const form = useForm({
//     resolver: zodResolver(createChaptersSchema),
//     defaultValues: {
//       title: "",
//       units: ["", "", ""],
//     },
//   });

//   const [generatedHref, setGeneratedHref] = useState("");
//   const linkButtonRef = useRef();

//   useEffect(() => {
//     if (generatedHref) {
//       linkButtonRef.current.click();
//     }
//   }, [generatedHref]);

//  function onSubmit(data) {
//     if (data.units.some((unit) => unit === "")) {
//       alert("Please fill all the units");
//       return;
//     }
//     setGeneratedHref("#");
//     createChapters(data, {
//       onSuccess: async ({ course_id }) => {
//         // Generate the href based on the course_id
//         const href = `/create/${course_id}`;
//         setGeneratedHref(href);

//         try {
//           // Make an API call to update the user's credits
//           const updateResponse = await fetch("/api/credits/updateCredits", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               userId: session.user.id,  
//               userRole: session.user.role,
//               courseId: course_id,
//               courseName: data.title,
//               credsToUpdate: -1, // Deduct 1 credit
//             }),
//           });

//           if (!updateResponse.ok) {
//             throw new Error(`Credit update failed. Status: ${updateResponse.status}`);
//           }
//           const updateData = await updateResponse.json();
//           if (updateData.success) {
//             console.log(`Course created successfully! Your remaining credits: ${updateData.updatedCredits}`);
//             session.user.credits = updateData.updatedCredits
//           } else {
//             console.error("Failed to update credits:", updateData.error);
//           }
//         } catch (error) {
//           console.error("Error updating credits:", error.message);
//         }
//       },
//       onError: (error) => {
//         console.log(error);
//       },
//     });
//   }

//   return (
//     <div className="card container w-75 mt-3 rounded-3 text-dark bg-dark-subtle col-form-label ">
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="form-group row align-items-center">
//           <label className=" col-form-label col-md-1 text-white font-monospace text-white font-monospace fs-4 mb-4  ">
//             <label htmlFor="title border-white" style={{ fontFamily: "quando" }}>Title: </label>
//           </label>{" "}
//           {/* Added margin-bottom className here for tittle tag*/}
//           <div className="col-md-11">
//             <input
//               type="text"
//               className="form-control bg-black mb-4" /* Added margin-bottom className here for tittle*/
//               id="title"
//               placeholder="Enter the main topic of your course (e.g: 'Java')"
//               {...form.register("title")}
//             />
//           </div>
//         </div>

//         {form.watch("units").map((_, index) => {
//           return (
//             <div className="form-group row align-items-center " key={index}>
//               <label
//                 htmlFor={`units.${index}`}
//                 className="col-form-label col-md-1 text-white  mb-3"
//                 style={{ fontFamily: "quando" }}
//               >
//                 Unit {index + 1}
//               </label>
//               <div className="col-md-11">
//                 <input
//                   key={index}
//                   type="text"
//                   className="form-control bg-black mb-3" /* Added margin-bottom className here for units*/
//                   id="units"
//                   placeholder="Now enter the subtopic of your course (e.g: 'OOP')"
//                   {...form.register(`units.${index}`)}
//                 />
//               </div>
//             </div>
//           );
//         })}

//         {/* BUTTONS */}
//         <div
//           className="container d-flex gap-2 col-form-label justify-content-start "
//           style={{ fontFamily: "chillax" }}
//         >
//           {" "}
//           {/*col-form-label */}
//           <button
//             type="button"
//             className="addbutton"
//             onClick={() => {
//               form.setValue("units", [...form.watch("units"), ""]);
//             }}
//           >
//             <span className="button__text">Add</span>
//             <span className="button__icon">
//               <Plus />
//             </span>
//           </button>
//           <button
//             type="button"
//             className="delbutton"
//             onClick={() => {
//               form.setValue("units", form.watch("units").slice(0, -1));
//             }}
//           >
//             <span className="button__text">Delete</span>
//             <span className="button__icon">
//               <X />
//             </span>
//           </button>
//           <hr className="flex-grow-1 bg-secondary " />
//           <button
//             disabled={isLoading}
//             type="submit"
//             className={style.button}
//             style={{ fontFamily: "vast", color: "", fontWeight: "bold" }}
//           >
//             Generate
//           </button>
//         </div>
//       </form>
//       <Link
//         href={generatedHref}
//         ref={linkButtonRef}
//         style={{ display: "none" }}
//       >
//         Hidden Link
//       </Link>
//     </div>
//   );
// };
// export default CreateCourseForm;
