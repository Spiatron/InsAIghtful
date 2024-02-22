"use client";
import React, {useState, useRef} from "react";
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
  progress,
  courseProgress,
}) => {
  const [totalProgress, setTotalProgress] = useState(progress || 0);
  const [answers, setAnswers] = useState(extractedAnswers || {})
  const [resetKey, setResetKey] = useState(0);
  const chapterVideoDoneRef = useRef(
    new Map(
      courseProgress.map((prog) => [prog.chapterId, prog.videoDone || false])
    )
  );
  const chapterQuizDoneRef = useRef(
    new Map(
      courseProgress.map((prog) => [prog.chapterId, prog.quizDone || false])
    )
  );
  const handleVideoEnd = async () => {
    if (!chapterVideoDoneRef.current.get(chapter.id)) {
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
          chapterQuizDoneRef.current.set(chapter.id, true);
        } catch (error) {
          console.error("Error during API call:", error);
        }
      }
      setTotalProgress(newProgress);
      chapterVideoDoneRef.current.set(chapter.id, true);
    }
  };
  const handleQuizEnd = async (answers, allCorrect) => {
    if (!chapterQuizDoneRef.current.get(chapter.id)) {
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
        chapterQuizDoneRef.current.set(chapter.id, true);
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
      chapterVideoDoneRef.current = new Map(
        courseProgress.map((prog) => [prog.chapterId, false])
      );
      chapterQuizDoneRef.current = new Map(
        courseProgress.map((prog) => [prog.chapterId, false])
      );
      setAnswers({})
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
              chapterVideoDoneRef={chapterVideoDoneRef}
              chapterQuizDoneRef={chapterQuizDoneRef}
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
              extractedBooleans={extractedBooleans}
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
