"use client";
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
    <div>
      <h1>Concept Check</h1>
      <div>
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options);
          return (
            <div
              key={question.id}
              style={{
                backgroundColor:
                  QuestionState[question.id] === true
                    ? "#00ff00"
                    : QuestionState[question.id] === false
                    ? "#ff0000"
                    : "",
              }}
            >
              <h1>{question.question}</h1>
              <div>
                {options.map((option, index) => {
                  return (
                    <div key={index}>
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
      <button type="button" onClick={checkAnswer}>
        Check Answer
      </button>
    </div>
  );
};

export default QuizCards;
