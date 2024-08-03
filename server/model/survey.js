// import mongoose from "mongoose";
// const { model, models, Schema } = mongoose;

import mongoose from "mongoose";
const {model,models,Schema}= mongoose;


// const questionSchema = new Schema({
//   questionText: String,
//   questionType: String,
//   options: [String],
// });

const questionSchema = new Schema({
  questionText : String,
  questionType: String,
  options: [String]
})

// const SurveySchema = new Schema({
//   title: String,
//   description: String,
//   questions: [questionSchema],
 
//   userId: mongoose.Schema.Types.ObjectId,
//   url: String,
//   responses: Array, 
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

const SurveySchema = new Schema({
  title:String,
  description:String,
  questions: [questionSchema],
  userId: mongoose.Schema.Types.ObjectId,
  url:String,
  responses:Array,
  date:{
    type:Date,
    default:Date.now
  }

})


// export const SurveyModel = models?.Survey || model("createdsurvey", SurveySchema);
export const SurveyModel = models?.Survey || model("createdsurvey", SurveySchema)