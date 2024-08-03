import mongoose from "mongoose";
const { model, models, Schema } = mongoose;


const DeletedSurveySchema = new Schema({
    // _id:  String ,
    deletedId:String,
    title: String,
    description:String ,
    questions:String ,
    // deletedByUserId: mongoose.Schema.Types.ObjectId,
    date: {
    type: Date,
    default: Date.now,
  },
});


export const TrashModel = models?.Survey || model("deletedSurvey", DeletedSurveySchema);
