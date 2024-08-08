import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ShowSurvey.css";
import FadeLoader from "react-spinners/FadeLoader";
import { ToastContainer, toast } from "react-toastify";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import Lottie from "react-lottie";
import animationData from "../../assests/Animation.json";
import { HiMiniXMark } from "react-icons/hi2";
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
  const [phonenumber, setPhoneNumber] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const surveyid = uniqueId;
  const handleClickOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    setResponses("");
  };

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
      setResponses("");
      // window.location.reload();
      handleClickOpenSuccess(true);
    } catch (error) {
      console.error("Failed to submit survey", error);
      toast.error("Failed to submit survey");
    }
  };
  const handleSubmitPhoneNumber = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/survey/prize`, {
        phonenumber,
        surveyid,
      });
      toast.success("Phone number sent successfully.");
      handleCloseSuccess();
      window.location.reload();
    } catch (error) {
      console.error("Failed to send phone number", error);
      toast.error("Failed to send phone number");
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
            Sent Successully
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
              To get the prize of 100birr mobile card, please fill your phone
              number below.
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{
                width: "80%",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <form onSubmit={handleSubmitPhoneNumber}>
                <input
                  type="text"
                  placeholder="+251 91 8234567"
                  required
                  value={phonenumber}
                  name="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></input>
                <input type="hidden" value={surveyid} name="surveyid"></input>
                <button type="submit">Send</button>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShowSurvey;
