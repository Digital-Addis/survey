import trashModel from '../model/trash.js';

export async function registerDeletedSurvey(req, res) {
  const { deletedId, title, description, questions } = req.body;
  
  const newDeletedSurvey = new trashModel({
    deletedId,
    title,
    description,
    questions,
  });
  
  try {
    const saveDeletedSurvey = await newDeletedSurvey.save();
    return res.status(201).send({ msg: "Survey Deleted Registered successfully.", saveDeletedSurvey });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error", error });
  }
}
