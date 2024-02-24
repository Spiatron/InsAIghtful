"use client";
import React, { useState, useEffect } from "react";
import Progressbar from "@/components/Progressbar";
import MainVideoSummary from "./MainVideoSummary";
import QuizCards from "./QuizCards";
import CourseSideBar from "./CourseSideBar";
import style from "@/styles/finalgeneration.module.css";

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

      if (!response.ok) {
        console.error("API call failed");
        return;
      }
      setVideoDone({});
      setQuizDone({});
      setAnswers({});
      setBooleans({});
      setResetKey((prevKey) => prevKey + 1);
      setTotalProgress(0);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className={style.finalgeneration}>
      <div>
        <Progressbar progress={totalProgress} />
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
        </div>
      </div>
      <div>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default CoursePage;
