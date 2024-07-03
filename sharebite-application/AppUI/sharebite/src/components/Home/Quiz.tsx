import React, { useState } from "react";
import "../../../css/Quiz.css"; // Import the CSS

// Define the Quiz component
const Quiz = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);

  // Define the questions array
  const questions = [
    {
      text: "Be a Hunger Hero",
      answer:
        "Join us in the fight against hunger by becoming a vital part of our team. Whether you're a passionate chef, a dedicated helper, or a reliable delivery person, your support ensures that surplus food reaches those who need it most. You can also make a difference by donating funds to sustain our mission.",
      buttonText: "JOIN THE TEAM",
    },
    {
      text: "Partner with Purpose",
      answer:
        "Are you a food chain or restaurant looking to make a meaningful impact? Partner with us to post surplus food availability and help us rescue perfectly good food from going to waste. Additionally, your donation of raw materials can fuel our efforts during special events.",
      buttonText: "BECOME A PARTNER",
    },
    {
      text: "Unite for Change",
      answer:
        "Join forces with us as an NGO dedicated to ending hunger and food waste. Together, we can amplify our impact and ensure that no edible food goes to waste. Let's work hand in hand to create a hunger-free world for all.",
      buttonText: "JOIN THE MOVEMENT",
    },
  ];

  const handleInitialQuestionClick = () => {
    setShowAllQuestions(true);
  };

  return (
    <div className="Quiz">
      {!showAllQuestions ? (
        <button
          className="question initial-question"
          onClick={handleInitialQuestionClick}
        >
          How can you contribute?
        </button>
      ) : selectedQuestion === null ? (
        <>
          {questions.map((question, index) => (
            <button
              key={index}
              className="question second-questions"
              onClick={() => setSelectedQuestion(index)}
            >
              {question.text}
            </button>
          ))}
          <button
            className="back-button"
            onClick={() => setShowAllQuestions(false)}
          >
            Back
          </button>
        </>
      ) : (
        <div>
          <h2 className="center-text">
            {questions[selectedQuestion].buttonText}
          </h2>
          <p className="answer">{questions[selectedQuestion].answer}</p>
          <div className="button-container">
            <button
              className="back-button"
              onClick={() => setSelectedQuestion(null)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
