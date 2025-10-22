
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = "AIzaSyDLYUEPiaK2m6S8kGXa4xzxhWG5B4WRlKk";



const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main(prompts){
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: prompts,
  });
  console.log(response.text);
  return response.text;
}

export default main;