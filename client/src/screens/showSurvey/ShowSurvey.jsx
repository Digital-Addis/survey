import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ShowSurvey.css";
import FadeLoader from "react-spinners/FadeLoader";
import { ToastContainer, toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ShowSurvey = () => {
  const { uniqueId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState({});

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

    const timer = setTimeout(() => {
      fetchSurvey();
    }, 1000);

    return () => clearTimeout(timer);
  }, [uniqueId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: {
          ...prevResponses[name],
          [value]: checked,
        },
      }));
    } else if (type === "radio") {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: value,
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/survey/submit/${uniqueId}`, {
        responses,
      });
      toast.success("Survey submitted successfully!");
      setResponses("");
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit survey", error);
      toast.error("Failed to submit survey");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <FadeLoader
          color="#007bff"
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!survey) {
    return null;
  }

  return (
    <div>
      <ToastContainer />
      <div className="content-wrappers">
        <form className="surveyContent" onSubmit={handleSubmit}>
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
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <p style={{ marginBottom: "3px", marginTop: "11px" }}>
                  {index + 1}. {question.questionText}
                </p>
                {question.questionType === "multiple choice" &&
                  question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value={option}
                        onChange={handleChange}
                        style={{ marginBottom: "11px" }}
                      />
                      <label style={{ marginBottom: "6px" }}>{option}</label>
                    </div>
                  ))}
                {question.questionType === "single choice" &&
                  question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={handleChange}
                        style={{ marginBottom: "4px", marginRight: "5px" }}
                      />
                      <label>{option}</label>
                    </div>
                  ))}
                {question.questionType === "text" && (
                  <input
                    required
                    type="text"
                    name={`question-${index}`}
                    placeholder="Your answer"
                    onChange={handleChange}
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
