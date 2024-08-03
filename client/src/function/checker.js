import axios from 'axios'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
export async function postSurvey(credentials) {
    try {
      const {
        data:msg,
      } = await axios.post("/api/fill-survey", credentials);
  
      return Promise.resolve(msg);
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data.error);
      } else if (error.request) {
        return Promise.reject("No response received from server");
      } else {
        return Promise.reject("Error while sending request");
      }
    }
  }