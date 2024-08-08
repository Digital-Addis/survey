// import { Router } from "express";
import {Router} from 'express'

// const surveyRoute = Router();
const surveyRoute = Router()

// import * as surveyController from '../controller/survey.js'
import * as surveyController from '../controller/survey.js'

// surveyRoute.route("/create-survey").post(surveyController.createSurvey)
surveyRoute.route("/create-survey").post(surveyController.createSurvey)
// surveyRoute.route("/get-surveys").get(surveyController.getSurvey)
surveyRoute.route("/get-surveys").get(surveyController.getSurvey)
// surveyRoute.route("/get-total-surveys").get(surveyController.getSurveyTotalNumber)
surveyRoute.route("/get-total-surveys").get(surveyController.getSurveyTotalNumber)
// surveyRoute.route("/each-survey/:id").get(surveyController.getSurveysByUniqueId)
surveyRoute.route('/each-survey/:id').get(surveyController.getSurveysByUniqueId)
// surveyRoute.route("/get-survey/:id").get(surveyController.getSurveyById)
surveyRoute.route('/get-survey/:id').get(surveyController.getSurveyById)
// surveyRoute.route("/get-survey-link/:id").get(surveyController.getSurveyLinkById)
surveyRoute.route('/get-survey-link/:id').get(surveyController.getSurveyLinkById)
// surveyRoute.route("/get-survey-id").get(surveyController.getSurveyLinkByTitle)
surveyRoute.route('/get-survey-id').get(surveyController.getSurveyLinkByTitle)
// surveyRoute.route("/update-survey/:id").put(surveyController.updateSurvey)
surveyRoute.route('/update-survey/:id').put(surveyController.updatedSurvey)
// surveyRoute.route("/delete-survey/:id").delete(surveyController.deleteSurvey)
surveyRoute.route("/delete-survey/:id").delete(surveyController.deleteSurvey)
// surveyRoute.route("/deleted-collection-survey").post(surveyController.registerDeletedSurvey)
surveyRoute.route("/deleted-collection-survey").post(surveyController.registerDeletedSurvey)
// surveyRoute.route("/deleted-surveys").get(surveyController.getDeletedSurvey)
surveyRoute.route("/deleted-surveys").get(surveyController.getDeletedSurvey)
surveyRoute.route("/deleted-survey-number").get(surveyController.getDeletedSurveysNumber)
  // export default surveyRoute;

surveyRoute.route("/submit/:uniqueId").post(surveyController.submitSurvey)  
surveyRoute.route("/generate-question").post(surveyController.geminiAI)
export default surveyRoute



