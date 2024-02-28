"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Progressbar from "@/components/Progressbar";
import MainVideoSummary from "./MainVideoSummary";
import QuizCards from "./QuizCards";
import CourseSideBar from "./CourseSideBar";
import Popup from "./Popup";
import style from "@/styles/finalgeneration.module.css";
import ResetBtnStyles from "@/styles/buttons/ResetBtnStyles.css";
import FinalPageNavigationButtonsStyles from '@/styles/buttons/FinalPageNavigationButtonsStyles.css'
import styles from "@/styles/buttons/ShowResultBtnStyles.css";
import { BiReset } from "react-icons/bi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FastForward } from 'lucide-react';


const CoursePage = ({
  course,
  unitIndex,
  chapterIndex,
  chapter,
  questions,
  extractedAnswers,
  extractedBooleans,
  increment,
}) => {
  const [totalProgress, setTotalProgress] = useState(0);
  const [videoDone, setVideoDone] = useState({});
  const [quizDone, setQuizDone] = useState({});
  const [answers, setAnswers] = useState(extractedAnswers || {});
  const [booleans, setBooleans] = useState(extractedBooleans || {});
  const [resetKey, setResetKey] = useState(0);

  // Popup function to show overall-result 
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to fetch progress data from the server
  const fetchProgress = async () => {
    try {
      const response = await fetch("/api/progress/getProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to fetch progress data");
        return;
      }

      const { progress, VideoDone, QuizDone } = await response.json();
      setTotalProgress(progress);
      setVideoDone(VideoDone);
      setQuizDone(QuizDone);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Fetch progress data when the component mounts
  useEffect(() => {
    fetchProgress();
  }, []);

  const handleVideoEnd = async () => {
    console.log(videoDone[chapter.id]);
    if (!videoDone[chapter.id]) {
      let newProgress;
      if (!questions.length == 0) {
        try {
          const response = await fetch("/api/progress/updateProgress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: course.id,
              chapterId: chapter.id,
              videoDone: true,
            }),
          });

          if (!response.ok) {
            console.error("API call failed");
            return;
          }
          newProgress = await (totalProgress + increment);
        } catch (error) {
          console.error("Error during API call:", error);
        }
      } else {
        try {
          const response = await fetch("/api/progress/updateProgress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId: course.id,
              chapterId: chapter.id,
              videoDone: true,
              quizDone: true,
            }),
          });

          if (!response.ok) {
            console.error("API call failed");
            return;
          }
          newProgress = await (totalProgress + increment * 2);
          quizDone[chapter.id] = true;
        } catch (error) {
          console.error("Error during API call:", error);
        }
      }
      setTotalProgress(newProgress);
      videoDone[chapter.id] = true;
    }
  };
  const handleQuizEnd = async (answers, allCorrect) => {
    if (!quizDone[chapter.id]) {
      try {
        const response = await fetch("/api/progress/updateProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.id,
            chapterId: chapter.id,
            quizDone: allCorrect,
            selectedAnswers: answers,
          }),
        });

        if (!response.ok) {
          console.error("API call failed");
          return;
        }
        quizDone[chapter.id] = true;
      } catch (error) {
        console.error("Error during API call:", error);
      }
    } else {
      try {
        const response = await fetch("/api/progress/updateProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.id,
            chapterId: chapter.id,
            quizDone: allCorrect,
            selectedAnswers: answers,
          }),
        });

        if (!response.ok) {
          console.error("API call failed");
          return;
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }
    }
    if (allCorrect) {
      const newProgress = await (totalProgress + increment);
      setTotalProgress(newProgress);
    }
  };
  const handleReset = async () => {
    const shouldReset = window.confirm(
      `All your progress will be reset. Are you sure?`
    );

    if (shouldReset) {
      try {
        const response = await fetch("/api/progress/resetProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course.id,
          }),
        });

        if (response.ok) {
          setVideoDone({});
          setQuizDone({});
          setAnswers({});
          setBooleans({});
          setResetKey((prevKey) => prevKey + 1);
          setTotalProgress(0);
          alert("Course reset complete!");
        } else {
          console.error("API call failed");
          alert("Failed to reset course progress. Please try again.");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        alert("An error occurred while resetting course progress. Please try again later.");
      }
    } else {
      alert("Course reset canceled.");
    }
  };

  // This function is used for Navigation of chapters
  const unit = course.units[unitIndex]
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className={style.finalgeneration}>

      <div className="container">
        <div className="row">
          <div className="col">
            <Progressbar progress={totalProgress} />
          </div>
          <div className="col-auto">
            {/* Overall Progress reset button */}
            <button className="ResetBtn" type="button" onClick={handleReset} data-bs-toggle="tooltip" title="Reset your overall Progress">
              <span className="button__text" style={{ fontFamily: "quando", color: "", fontWeight: "bold" }}>Reset</span>
              <span className="button__icon">
                <BiReset className="svg" size={30} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="row">

        {/* Course sidebar */}
        <div className="col-md-3 mt-4">
          <div className="">
            <CourseSideBar
              course={course}
              currentChapterId={chapter.id}
              chapterVideoDone={videoDone}
              chapterQuizDone={quizDone}
            />
          </div>
        </div>

        {/* Main video summary */}
        <div className="col-md-6 mt-4">
          <div className="">
            <MainVideoSummary
              unitIndex={unitIndex}
              chapter={chapter}
              chapterIndex={chapterIndex}
              onVideoEnd={handleVideoEnd}
            />
            <div className="mb-3 ms-5 me-5 d-flex justify-content-between" >
              <div>
                {prevChapter && (
                  <Link className="text-decoration-none" href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}>
                    <button className="Previousbutton">
                      <div className="PreviousArrow">
                        <FastForward color="black" />
                      </div>
                      <span className="BtnText">Previous</span>

                    </button>
                  </Link>
                )}
              </div>
              <div>
                {nextChapter && (
                  <Link className="text-decoration-none" href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}>
                    <button className="Nextbutton">
                      <span className="BtnText">Next</span>
                      <div className="arrow">
                        <FastForward color="black" />
                      </div>
                    </button>
                  </Link>
                )}
              </div>
            </div>
            
          </div>
        </div>

        {/* Quiz card */}
        <div className="col-md-3 mt-4">
          <div className="">
            <QuizCards
              key={resetKey}
              questions={questions}
              extractedAnswers={answers}
              extractedBooleans={booleans}
              onQuizEnd={handleQuizEnd}
            />
          </div>
          {/* Overall result Pop-up */}
          <div className="d-flex justify-content-center mt-2 mb-4">
            <button
              className="cssbuttons-io-button"
              style={{
                fontFamily: "quando", fontWeight: "bold"
              }}
              onClick={togglePopup}
            >
              Show Result
              <div className="icon">
                <div className="svg">
                  <MdOutlineDoubleArrow size={100} />
                </div>
              </div>
            </button>
            {showPopup && <Popup onClose={togglePopup} />}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CoursePage;
