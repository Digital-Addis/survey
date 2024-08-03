import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateSurvey.css";
import { toast, ToastContainer } from "react-toastify";
import { AreaTop } from "../../components";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams, useNavigate } from "react-router-dom";

const UpdateSurvey = () => {
  const [description, setDescription]=useState('')
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", questionType: "text", options: [] },
  ]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/survey/get-survey/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setQuestions(response.data.questions);
        setDescription(response.data.description)
      })
      .catch(error => {
        console.error("There was an error fetching the survey!", error);
      });
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = questions.slice();
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", questionType: "text", options: [] },
    ]);
  };

  const addOption = (index) => {
    const newQuestions = questions.slice();
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSurvey = { title,description, questions };

    try {
      const res = await axios.put(`http://localhost:8080/api/survey/update-survey/${id}`, updatedSurvey);
      console.log("Survey updated successfully:", res.data);
      toast.success("Survey updated successfully.");
      navigate(`/survey/${id}`); // Redirect to surveys list page
    } catch (error) {
      toast.error("An error occurred, please try again.");
      console.error("Error updating survey:", error);
    }
  };

  return (
    <>
      <main className="page-wrapper">
        <Sidebar />
        <AreaTop />
        <ToastContainer />
        <div className="content-wrapper">
        <form onSubmit={handleSubmit}>
            <div>
              <h3 style={{textDecoration:'underline'}}>Title</h3>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <h3 style={{textDecoration:'underline'}}>Description</h3>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <h3 style={{textDecoration:'underline'}}>Questions</h3>
            <br/>

            {questions.map((question, index) => (
              <div key={index}>
                
                <label>Question {index + 1}</label>
                <input
                  type="text"
                  name="questionText"
                  placeholder={`Question ${index + 1}`}
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
                <select
                  name="questionType"
                  value={question.questionType}
                  onChange={(e) => handleQuestionChange(index, e)}
                >
                  <option value="text">Text</option>
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="single choice">Single Choice</option>
                </select>
                {question.questionType === "multiple choice" &&
                  question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                    />
                  ))}
                {question.questionType === "multiple choice" && (
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="add-question-button"
                  >
                    Add Option
                  </button>
                )}
                {question.questionType === "single choice" &&
                  question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                    />
                  ))}
                {question.questionType === "single choice" && (
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="add-question-button"
                  >
                    Add Option
                  </button>
                )}
              </div>
            ))}
           
            <div>
              <button
                type="button"
                onClick={addQuestion}
                className="add-question-button"
              >
                Add Question
              </button>
            </div>
            <button type="submit">Update Survey</button>
          </form>

          {/* <form onSubmit={handleSubmit}>
            <h1>Update Survey</h1>
            <input
              type="text"
              placeholder="Survey Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {questions.map((question, index) => (
              <div key={index} className="question-block">
                <h2>Question {index + 1}</h2>
                <input
                  type="text"
                  placeholder="Question Text"
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                />
                <select
                  value={question.questionType}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionType", e.target.value)
                  }
                >
                  <option value="text">Text</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="single choice">Single Choice</option>
                </select>
                {question.questionType === "multiple-choice" && (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={question.options.join(",")}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "options",
                        e.target.value.split(",")
                      )
                    }
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-question-button"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button type="submit">Update Survey</button>
          </form> */}
        </div>
      </main>
    </>
  );
};

export default UpdateSurvey;
