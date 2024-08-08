// import { SurveyModel } from '../model/survey.js';
import {SurveyModel} from '../model/survey.js'
import {TrashModel} from '../model/trash.js'
import { PrizeModel } from '../model/prize.js'
// import { v4 as uuidv4 } from 'uuid';
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function createSurvey(req, res) {
//   const { title, description, questions, userId } = req.body;
//   const uniqueId = uuidv4();
//   const surveyUrl = `http://localhost:3000/survey/${uniqueId}`;

//   const newSurvey = new SurveyModel({
//     title,
//     description,
//     questions,
//     url: surveyUrl,
//   });

//   try {
//     const savedSurvey = await newSurvey.save();
//     res.status(201).json({ message: 'Survey created successfully', surveyId: savedSurvey._id, url: surveyUrl });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create survey' });
//   }
// }
export async function createSurvey(req, res) {
    const {title,description, questions, userId} = req.body;
    const uniqueId = uuidv4();
    const surveyUrl = `http://localhost:3000/survey/${uniqueId}`

    const newSurvey = new SurveyModel({title,description,questions,url:surveyUrl});

    try {
        const savedSurvey = await newSurvey.save()
        res.status(201).json({message:"Survey created successfully", surveyId:savedSurvey._id,url:surveyUrl})
    } catch (error) {
        res.status(500).json({error:'failed to create survey'})
    }
}


// export async function getSurveysByUniqueId  (req, res) {
//   const { uniqueId } = req.params;

//   try {
//     const survey = await SurveyModel.findOne({ url: `/survey/${uniqueId}` });
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch survey' });
//   }
// };

export async function getSurveysByUniqueId (req,res){
    const { uniqueId}= req.params
    try {
        const survey = await SurveyModel.findOne({url:`/survey/${uniqueId}`})
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }
        res.status(200).json(survey)

    } catch (error) {
        res.status(500).json({error:"failed to fetch survey"})
    }

}

// export async function getSurvey (req, res)  {
//   try {
//     const survey = await SurveyModel.find().sort({date:-1})
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function getSurvey (req, res) {
    try {
        const survey = await SurveyModel.find().sort({date:-1})
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }

        res.status(200).json(survey)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// export async function getSurveyTotalNumber (req, res)  {
//   try {
//     const survey = await SurveyModel.find()
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey.length);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function getSurveyTotalNumber (req, res){
    try {
        const survey= await SurveyModel.find()
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }
        res.status(200).json(survey.length)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// export async function getSurveyById (req, res)  {
//   try {
//     const survey = await SurveyModel.findById(req.params.id);
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


export async function getSurveyById (req, res) {
    try {
        const survey = await SurveyModel.findById(req.params.id)
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }
        res.status(200).json(survey)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// export async function getSurveyLinkById (req, res)  {
//   try {
//     const survey = await SurveyModel.findById(req.params.id);
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey._id);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function getSurveyLinkById (req, res){
    try {
        const survey = await SurveyModel.findById(req.params.id)
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }
        res.status(200).json(survey._id)


    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// export async function getSurveyLinkByTitle (req, res)  {
//   try {
//     const survey = await SurveyModel.findOne(req.body);
//     if (!survey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(survey._id);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function getSurveyLinkByTitle (req, res){
    try {
        const survey = await SurveyModel.findOne(req.body)
        if(!survey){
            return res.status(404).json({error:'survey not found'})
        }
        res.status(200).json(survey._id)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// export async function updateSurvey  (req, res)  {
//   try {
//     const updatedSurvey = await SurveyModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedSurvey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json(updatedSurvey);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function updatedSurvey (req, res){
    try {
        const updatedSurvey = await SurveyModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updatedSurvey){
            return res.status(404).json({error:'survey not found'})
        }

        res.status(200).json(updatedSurvey)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// export async function deleteSurvey (req, res) {
//   try {
//     const deletedSurvey = await SurveyModel.findByIdAndDelete(req.params.id);
//     if (!deletedSurvey) {
//       return res.status(404).json({ error: 'Survey not found' });
//     }
//     res.status(200).json({ message: 'Survey deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message }); 
//   }
// };

export async function deleteSurvey (req, res){
    try {
        const deletedSurvey = await SurveyModel.findByIdAndDelete(req.params.id)
        if(!deleteSurvey){
            res.status(404).json({error:"survey not found"})
        }
        res.status(200).json({message:'Survey deleted successfully'})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// export async function registerDeletedSurvey(req, res) {
//   const { deletedId, title, description, questions } = req.body;
  
//   const newDeletedSurvey = new TrashModel({
//     deletedId,
//     title,
//     description,
//     questions,
//   });
  
//   try {
//     const saveDeletedSurvey = await newDeletedSurvey.save();
//     return res.status(201).send({ msg: "Survey Deleted Registered successfully.", saveDeletedSurvey });
//   } catch (error) {
//     return res.status(500).send({ error: "Internal server error", error });
//   }
// }

export async function registerDeletedSurvey (req,res){
    const {deletedId, title,description,questions} = req.body;

    const newDeletedSurvey = new TrashModel({
        deletedId,title,description,questions
    })

    try {
        const saveDeletedSurvey = await newDeletedSurvey.save()
        return   res.status(201).send({msg:'Survey deleted registered successfully',saveDeletedSurvey})
    } catch (error) {
        return res.status(500).send({error:'Internal server error',error})
    }

}


// export async function getDeletedSurvey (req, res)  {
//   try {
//     const survey = await TrashModel.find().sort({date:-1}); 
//     if (!survey) {
//       return res.status(404).json({ error: 'Deleted Survey not found' });
//     }
//     res.status(200).json(survey);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export async function getDeletedSurvey (req, res){
    try {
        const survey = await TrashModel.find().sort({date:-1})
        if(!survey){
            return res.status(404).json({error:'deleted survey not found'})
        }
        res.status(200).json(survey)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export async function getDeletedSurveysNumber (req,res){
    try {
        const survey = await TrashModel.find()
        if(!survey){
            return res.status(404).json({error:'deleted survey number is not found'})
        }
        res.status(200).json(survey.length)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export async function submitSurvey(req,res){
    const { uniqueId } = req.params;
    const { responses } = req.body;
  
    try {
      const survey = await SurveyModel.findOne({ _id: uniqueId });
      if (!survey) {
        return res.status(404).send("Survey not found");
      }
  
      survey.responses.push(responses);
      await survey.save();
  
      res.status(200).send("Survey responses submitted successfully");
    } catch (error) {
      console.error("Error submitting survey responses", error);
      res.status(500).send("Error submitting survey responses");
    }

}


export async function geminiAI(req, res) {
    try {
      const { prompt } = req.body;
  
      // Input validation
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).send("Invalid prompt");
      }
  
      // Initialize Generative AI model
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      // Start chat with the model
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
  
      // Generate response
        const result = await chat.sendMessage([prompt]);
      const text = await result.response.text();
  
      // Send response
      res.send(text);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Failed to generate content");
    }
  }
  
  export async function sendPhoneNumber(req, res) {
    const {phonenumber,surveyid} = req.body;
   
    try {
    const newPrize = new PrizeModel({phonenumber,surveyid});
         await newPrize.save()
        res.status(201).json({message:"Phone number sent successfully"})
    } catch (error) {
        res.status(500).json({error:'failed to send phone number'})
    }
}
