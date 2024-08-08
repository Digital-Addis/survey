import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./CreateSurvey.css";
import { toast } from "react-toastify";
import { AreaTop } from "../../components";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import animationData from "../../assests/Animation.json";
import { HiMiniXMark } from "react-icons/hi2";
import Lottie from "react-lottie";
import { FaCopy } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  TelegramIcon,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";
import { FaXmark } from "react-icons/fa6";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CreateSurvey = () => {
  const inputRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const makeRequestAPI = async (prompt) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/survey/generate-question",
        {
          prompt,
        }
      );

      const response = res.data; // Assuming the API response is in res.data

      setChatHistory([
        ...chatHistory,
        { prompt: prompt, response: response }, // Add both prompt and response to chat history
      ]);

      setPrompt(""); // Clear prompt after adding to chat history
    } catch (error) {
      console.error("Error generating question:", error);
      toast.error("Failed to generate question, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    if (e) {
      e.preventDefault();
    }
    if (prompt.trim() === "") {
      toast.error("Prompt cannot be empty");
      return;
    }
    await makeRequestAPI(prompt);
    inputRef.current.blur();
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await submitHandler();
    }
  };

  useEffect(() => {
    setChatHistory([]);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const titleShare =
    typeof document !== "undefined"
      ? document.title
      : "Check out this awesome content!";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [surveyLink, setSurveyLink] = useState("");

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "text",
        options: [],
        logic: { condition: "", targetQuestion: "" },
      },
    ]);
  };

  const removeQuestion = (indexToRemove) => {
    setQuestions(questions.filter((_, index) => index !== indexToRemove));
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = questions.slice();
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options.filter((_, index) => index !== optionIndex);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = questions.slice();
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const newQuestions = questions.slice();
    newQuestions[index].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = questions.slice();
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSurvey = {
      title,
      description,
      questions,
    };
    axios
      .post("http://localhost:8080/api/survey/create-survey", newSurvey)
      .then((response) => {
        console.log("Survey created successfully:", response.data);
        setSurveyLink(response.data.surveyId);
        handleClickOpenSuccess();
      })
      .catch((error) => {
        console.error("There was an error creating the survey!", error);
        toast.error("An error occurred, please try again.");
      });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/survey/${surveyLink}`);
    toast.success("Link copied.");
  };

  return (
    <>
      <main className="page-wrapper">
        <Sidebar />
        <AreaTop />
        <ToastContainer />
        <div className="content-wrapper-create-survey">
          <Dialog
            open={openSuccess}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseSuccess}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogActions>
              <Button onClick={handleCloseSuccess}>
                <HiMiniXMark
                  style={{
                    fontSize: "22px",
                  }}
                />
              </Button>
            </DialogActions>

            <Lottie options={defaultOptions} height={70} width={300} />

            <DialogTitle
              style={{
                fontSize: "46px",
                width: "80%",
                margin: "auto",
                textAlign: "center",
                color: "#14ac5f",
                fontWeight: "bolder",
                padding: "0px",
              }}
            >
              Success
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  width: "80%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                You have created a new survey. You can view it from the link
                below.
              </DialogContentText>
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  width: "94%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <br />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <NavLink
                    to={`http://localhost:3000/survey/${surveyLink}`}
                    target="_blank"
                    style={{
                      fontWeight: "300",
                      border: "1px dashed rgba(0,0,0,0.5)",
                      padding: "4px 9px ",
                      fontSize: "15px",
                      color: "black",
                    }}
                  >
                    http://localhost:3000/survey/{surveyLink}
                  </NavLink>
                  <FaCopy
                    className="copyButtonPopUp"
                    onClick={handleCopyLink}
                  />
                </span>
              </DialogContentText>
              <br />
              <DialogContentText
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p>Share on social media</p>
                <div
                  className="share-buttons"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <EmailShareButton url={shareUrl}>
                    <EmailIcon size={35} round={true} />
                  </EmailShareButton>
                  <FacebookShareButton url={shareUrl} quote={titleShare}>
                    <FacebookIcon size={35} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={titleShare}>
                    <XIcon size={35} round={true} />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} title={titleShare}>
                    <WhatsappIcon size={35} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareUrl} title={titleShare}>
                    <LinkedinIcon size={35} round={true} />
                  </LinkedinShareButton>

                  <TelegramShareButton url={shareUrl} title={titleShare}>
                    <TelegramIcon size={35} round={true} />
                  </TelegramShareButton>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {questions.map((question, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "11px",
                  padding: "5px 6px",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label>Question {index + 1}</label>
                  <FaXmark
                    className="questionXmark"
                    onClick={() => removeQuestion(index)}
                  />
                </span>
                <input
                  type="text"
                  name="questionText"
                  placeholder={`Question ${index + 1}`}
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, e)}
                  style={{ background: "transparent" }}
                />
                <select
                  name="questionType"
                  value={question.questionType}
                  onChange={(e) => handleQuestionChange(index, e)}
                  style={{ background: "transparent" }}
                  s
                >
                  <option value="text">Text</option>
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="single choice">Single Choice</option>
                </select>
                {question.questionType === "multiple choice" &&
                  question.options.map((option, optionIndex) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      key={optionIndex}
                    >
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e)
                        }
                      />
                      <FaXmark
                        className="questionXmark"
                        onClick={() => removeOption(index, optionIndex)}
                      />
                    </div>
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      key={optionIndex}
                    >
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e)
                        }
                      />
                      <FaXmark
                        className="questionXmark"
                        onClick={() => removeOption(index, optionIndex)}
                      />
                    </div>
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
              <input
                hidden
                name="userId"
                value="66a893ef3459567aee8dad0f"
              ></input>
            </div>
            <div>
              <button
                type="button"
                onClick={addQuestion}
                className="add-question-button"
              >
                Add Question
              </button>
            </div>
            <button type="submit">Create Survey</button>
          </form>
          <section className="aiContainer">
            <section>
              <form onSubmit={submitHandler}>
                <header>
                  <h2 style={{ textAlign: "center" }}>
                    Generate question with our AI.
                  </h2>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "17px",
                      marginTop: "6px",
                    }}
                  >
                    Enter type of question you want and let's our AI prepare
                    your question for you.
                  </p>
                </header>
                <textarea
                  type="text"
                  rows={3}
                  placeholder="enter your prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                />
                <button type="submit" onClick={submitHandler}>
                  Generate
                </button>
              </form>
              {loading && (
                <div>
                  {/* <Box sx={{ width: 300 }}>
      <Skeleton animation="wave"
                    width="100%" />
      <Skeleton animation="wave" 
                    width="100%"/>
      <Skeleton animation="wave" 
                    width="100%"/>
    </Box> */}
                  <Skeleton
                    animation="wave"
                    width="100%"
                    height={20}
                    // style={{ marginTop: "10px" }}
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width="100%"
                    height={20}
                    // style={{ marginTop: "10px" }}
                  />{" "}
                  <Skeleton
                    animation="wave"
                    width="100%"
                    height={20}
                    // style={{ marginTop: "10px" }}
                  />
                  <Skeleton animation="wave" width="100%" height={20} />
                  <Skeleton animation="wave" width="100%" height={20} />
                </div>
              )}
              {chatHistory.map((chat, index) => (
                <div className="aiResponseContainer" key={index}>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "15px",
                    }}
                  >
                    <b>{chat.prompt}</b>
                  </p>
                  <br />
                  <p>{chat.response}</p>
                </div>
              ))}
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default CreateSurvey;
