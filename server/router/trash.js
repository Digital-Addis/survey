import { Router } from "express";
const trashRoute = Router();
import * as trashController from '../controller/trash.js'
trashRoute.route("/deleted-collection-survey").post(trashController.registerDeletedSurvey)

  export default trashRoute;




