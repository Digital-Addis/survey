import {toast} from "react-toastify";
export async function userSurveyValidate(values) {
    const errors = surveyNameVerify({}, values);
  
    emailVerify(errors, values);
  
    return errors;
  }

function emailVerify(error = [], values) {
  if (!values.email) {
    error.email = toast.error("Email Required...");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...");
  } else if (!/^[A-Z0-9._5+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address...");
  }
}


function surveyNameVerify(error = {}, values) {
  if (!values.firstname) {
    error.username = toast.error("First Name is required...");
  } else if (!values.lastname) {
    error.password = toast.error("Last Name is required...");
  } else if (values.firstname.length < 3) {
    error.username = toast.error(
      "First Name character should be more than 3 character"
    );
  } else if (values.lastname.length < 3) {
    error.username = toast.error(
      "Last Name character should be more than 3 character"
    );
  }

  return error;
}
