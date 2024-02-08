"use client";
import "../styles/fonts.module.css";
import React, { useState, useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import styles from "@/styles/QuizCardStyles.css"

const QuizCards = ({
  questions,
  extractedAnswers,
  extractedBooleans,
  onQuizEnd,
}) => {
  const [answers, setAnswers] = useState(extractedAnswers || {});
  const [questionState, setQuestionState] = useState(extractedBooleans || {});
  const [isCheckButtonDisabled, setIsCheckButtonDisabled] = useState(true);

  useEffect(() => {
    const hasAnswerForAllQuestions = questions.every(
      (question) => answers[question.id]
    );

    setIsCheckButtonDisabled(!hasAnswerForAllQuestions);
  }, [answers, questions]);

  const previousAnswersRef = useRef(answers);

  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    if (!isEqual(answers, previousAnswersRef.current)) {
      questions.forEach((question) => {
        const userAnswer = answers[question.id];
        previousAnswersRef.current[question.id] = userAnswer;
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
      console.log("SAME");
    }
  }, [answers, questionState, questions]);

  return (
    <div className="QuizCard">
      <div className="bg-black bg-opacity-50 rounded-4 p-2" style={{ height: "", width: "" }}>
        <h5
          className="fs-1 text-center text-capitalize fw-bold"
          style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
        >
          Concept Check
        </h5>

        <div className=" " style={{ height: "", width: "" }}>
          {questions.map((question) => {
            const options = JSON.parse(question.options);
            return (
              <div className="border border-secondary rounded-4 p-2 mt-4 text-start"
                key={question.id}
                style={{
                  backgroundColor: questionState[question.id] === true ? "#689C0D" : questionState[question.id] === false ? "#ff0000" : "",
                  fontFamily: "quando",
                  color: "#E9EAEC",
                  fontSize: "14px",
                }}
              >
                {/*Question*/}
                <h5 className="fs-5 fw-bold" style={{ fontFamily: "asul", color: "#D0D2D7" }}>
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
                          onChange={(e) => {
                            setAnswers((prev) => ({
                              ...prev,
                              [question.id]: e.target.value,
                            }));
                          }}
                          defaultChecked={extractedAnswers[question.id] == option}
                        />
                        {option}
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
            className="btn btn-success"
            type="button"
            onClick={checkAnswer}
            disabled={isCheckButtonDisabled}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCards;
