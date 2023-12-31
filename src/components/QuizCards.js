"use client";
import "../styles/fonts.module.css";
import React from "react";

const QuizCards = ({ chapter }) => {
  const [Answers, setAnswers] = React.useState({});
  const [QuestionState, setQuestionState] = React.useState({});

  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...QuestionState };
    chapter.questions.forEach((question) => {
      const user_answer = Answers[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [Answers, QuestionState, chapter.questions]);
  return (
    <div
      className="bg-black w-75 bg-opacity-50  rounded-4 p-2"
      style={{ height: "", width: "" }}
    >
      {" "}
      {/*position-fixed top-0 end-0 p-3*/}
      <h5
        className="fs-1 text-center text-capitalize fw-bold"
        style={{ fontFamily: "angrybird", color: "#DEDEDE" }}
      >
        Concept Check
      </h5>
      <div className=" ">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options);
          return (
            <div
              className="border border-secondary rounded-4  p-2  mt-4 text-start"
              key={question.id}
              style={{
                backgroundColor:
                  QuestionState[question.id] === true
                    ? "#689C0D"
                    : QuestionState[question.id] === false
                    ? "#ff0000"
                    : "",
                fontFamily: "quando",
                color: "#E9EAEC",
                fontSize: "14px",
              }}
            >
              <h5
                className="fs-5 fw-bold"
                style={{ fontFamily: "asul", color: "#D0D2D7" }}
              >
                {question.question}
              </h5>
              <div className="text-capitalize">
                {options.map((option, index) => {
                  return (
                    <div key={index} className="mb-2">
                      <label htmlFor={question.id + index.toString()}>
                        <input
                          type="radio"
                          value={option}
                          id={question.id + index.toString()}
                          name={question.id}
                          onChange={(e) => {
                            setAnswers((prev) => {
                              return {
                                ...prev,
                                [question.id]: e.target.value, // Use e.target.value to get the selected option
                              };
                            });
                          }}
                        />

                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-grid mt-4">
        <button className="btn btn-success" type="button" onClick={checkAnswer}>
          Check Answer
        </button>
      </div>
    </div>
  );
};

export default QuizCards;
