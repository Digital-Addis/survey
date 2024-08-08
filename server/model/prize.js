import mongoose from "mongoose";
const {model,models,Schema}= mongoose;

const PrizeSchema = new Schema({
  phonenumber:String,
  surveyid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "createdsurvey",
  },
  date:{
    type:Date,
    default:Date.now
  }

})


export const PrizeModel = models?.Prize || model("prizeSurvey", PrizeSchema)