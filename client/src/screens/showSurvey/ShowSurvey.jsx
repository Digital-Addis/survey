import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ShowSurvey.css";
import FadeLoader from "react-spinners/FadeLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const ShowSurvey = () => {
  const { uniqueId } = useParams();
  const [survey, setSurvey] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/survey/get-survey/${uniqueId}`
        );
        console.log("data is ", response.data);
        setSurvey(response.data);
      } catch (error) {
        console.error("Failed to fetch survey", error);
      }
      setLoading(false);
    };

    // fetchSurvey();
    const timer = setTimeout(() => {
      fetchSurvey();
    }, 1000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [uniqueId]);

  if (!survey) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Center vertically
        }}
      >
        <FadeLoader
          color="#007bff"
          // loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="content-wrappers">
        <form className="surveyContent">
          <div>
            <h2>{survey.title}</h2>
          </div>
          <div>
            <p>{survey.description}</p>
          </div>
          <section className="surveySection">
            {survey.questions.map((question, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                <p style={{ marginBottom: "3px", marginTop: "11px" }}>
                  {" "}
                  {index + 1}. {question.questionText}
                </p>
                {question.questionType === "multiple choice" &&
                  question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      style={
                        {
                          // marginTop: "8px",
                          // marginBottom: "5px",
                        }
                      }
                    >
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value={option}
                        style={{ marginBottom: "11px" }}
                      />
                      <label style={{ marginBottom: "6px" }}> {option}</label>
                    </div>
                  ))}
                {question.questionType === "single choice" &&
                  question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        style={{ marginBottom: "4px", marginRight: "5px" }}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                {question.questionType === "text" && (
                  <input
                    type="text"
                    name={`question-${index}`}
                    placeholder="Your answer"
                    style={{ marginBottom: "15px" }}
                  />
                )}
              </div>
            ))}
          </section>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ShowSurvey;
