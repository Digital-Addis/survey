import React from "react";
// import "../styles/Form.css";
import { IoStarSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { userSurveyValidate } from "../function/validate";
import { postSurvey } from "../function/checker";
export default function Form() {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
    },
    validate: userSurveyValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      let surveyPromise = postSurvey(values);
      toast.promise(surveyPromise, {
        pending: "Sending...",
        success: "Sent successfully.",
        error: "An error occurred, please try again",
      });

      surveyPromise
        .then(function () {
          resetForm(); // Reset the form after successful submission
        })
        .catch(function (error) {
          console.error("Error during form submission:", error);
        });
    },
  });

  return (
    <div className="formContainer">
      <main className="main">
        <ToastContainer />
        {/* <header className="header">
          <h1>Digital Addis</h1>
          <p className="headerPara">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            accusamus quibusdam officia consequuntur debitis non, laborum minima
            facilis cumque rerum saepe porro adipisicing elit. Commodi
            repudiandae ea nisi dicta alias aperiam, libero eos?
          </p>
          <span className="requiredContainer">
            <IoStarSharp className="starIcon" />
            <p>Required</p>
          </span>
        </header> */}
        <main>
          <form onSubmit={formik.handleSubmit}>
            <section className="emailSection">
              <label>
                Email Address <IoStarSharp className="starIcon" />{" "}
              </label>
              <input
                type="text"
                placeholder="Your email"
                className="emailInput"
                {...formik.getFieldProps("email")}
              ></input>
            </section>
            <section className="emailSection">
              <label>
                First Name <IoStarSharp className="starIcon" />{" "}
              </label>
              <input
                type="text"
                placeholder="Your first name"
                className="emailInput"
                {...formik.getFieldProps("firstname")}
              ></input>
            </section>
            <section className="emailSection">
              <label>
                Last Name <IoStarSharp className="starIcon" />{" "}
              </label>
              <input
                type="text"
                placeholder="Your last name"
                className="emailInput"
                {...formik.getFieldProps("lastname")}
              ></input>
            </section>
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>
        </main>
      </main>
    </div>
  );
}
