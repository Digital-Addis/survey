
import mongoose from "mongoose";
const {model,models,Schema} = mongoose


const UserSchema = new Schema({
  email:String,
  password:String,
  date:{
    type:Date,
    default:Date.now
  }  
})


// export const UserModel = models?.Survey || model("users", UserSchema);
export const UserModel = models?.Survey || model("users", UserSchema)
