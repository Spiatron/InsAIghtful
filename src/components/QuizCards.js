"use client";
import "../styles/fonts.module.css";
import React, { useState, useEffect, useCallback } from "react";
import HistoryPopup from "./HistoryPopup";
import style from "@/styles/buttons/QuizCardStyles.css"

const QuizCards = ({
  chapterId,
  chapterName,
  videoDone,
  questions,
  extractedAnswers,
  extractedBooleans,
  onQuizEnd,
  onChapterReattempt,
}) => {
  const [answers, setAnswers] = useState(extractedAnswers || {});
  const [questionState, setQuestionState] = useState(extractedBooleans || {});
  const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false); //Usesate for HistoryPopup

  useEffect(() => {
    const hasAnswerForAllQuestions = questions.every(
      (question) =>
        answers[question.id] !== undefined && answers[question.id] !== null
    );

    if (
      Object.keys(extractedAnswers).length === 0 &&
      extractedAnswers.constructor === Object
    ) {
      setIsCheckButtonDisabled(!hasAnswerForAllQuestions);
    }
  }, [answers, questions]);

  const checkAnswer = useCallback(() => {
    if (videoDone) {
      const newQuestionState = { ...questionState };
      questions.forEach((question) => {
        extractedAnswers[question.id] = answers[question.id];
        const userAnswer = answers[question.id];
        if (userAnswer === question.answer) {
          newQuestionState[question.id] = true;
        } else {
          newQuestionState[question.id] = false;
        }
        setQuestionState(newQuestionState);
      });
      setIsCheckButtonDisabled(true);
      onQuizEnd(answers);
    } else {
      alert("Please watch the video first");
    }
  }, [answers, questionState, questions, videoDone]);

  //Function to trigger History and Result popup
  const toggleHistoryPopup = () => {
    setShowHistoryPopup(!showHistoryPopup);
  };

  return (
    <div className="QuizCard">
      <div
        className="bg-black bg-opacity-50 rounded-4 p-2"
        style={{ height: "", width: "" }}
      >
        <div className="d-flex flex-row align-items-center">
          {Object.keys(questionState).length > 0 && (
            <button className="Reattempt-button" onClick={onChapterReattempt}>Reattempt</button>
          )}
          <h5
            className="fs-2 text-center text-capitalize fw-bold mt-3 container"
            style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
          >
            Concept Check
          </h5>
          <button className="History-button" onClick={toggleHistoryPopup}>History</button>
        </div>

        <div className="" style={{ height: "", width: "" }}>
          {questions.map((question) => {
            const options = JSON.parse(question.options);
            return (
              <div
                className="border border-secondary rounded-4 p-2 mt-4 text-start Quiz"
                key={question.id}
                style={{
                  backgroundColor:
                    questionState[question.id] === true
                      ? "#27a300"
                      : questionState[question.id] === false
                        ? "#ae0000"
                        : "",
                  fontFamily: "quando",
                  color: "#E9EAEC",
                  fontSize: "14px",
                }}
              >
                {/*Question*/}
                <h5
                  className="fs-5 fw-bold"
                  style={{ fontFamily: "asul", color: "#D0D2D7" }}
                >
                  {question.question}
                </h5>
                <div className="text-capitalize">
                  {options.map((option, index) => (
                    <div key={index} className="mb-1">
                      <label htmlFor={question.id + index.toString()}>
                        <input
                          type="radio"
                          value={option}
                          id={question.id + index.toString()}
                          name={question.id}
                          onChange={() => {
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: index,
                            }));
                          }}
                          defaultChecked={
                            extractedAnswers[question.id] == index
                          }
                          disabled={
                            extractedAnswers[question.id] !== undefined &&
                            extractedAnswers[question.id] !== null
                          }
                        />
                        <span className="m-1">
                          {option}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-grid mt-4">
          <button
            style={{
              fontFamily: "quando",
              fontWeight: "bold",
              transition: "color 0.3s ease-in-out", // Adding a transition effect for color change
            }}
            className="CheckAnswer-button"
            type="button"
            onClick={checkAnswer}
            disabled={isCheckButtonDisabled}
          >
            Check Answer
          </button>
        </div>
      </div>
      {/* History Popup */}
      <div>
        {showHistoryPopup && (
          <HistoryPopup
            chapterId={chapterId}
            chapterName={chapterName}
            onClose={toggleHistoryPopup}
          />
        )}
      </div>
    </div>
  );
};

export default QuizCards;
