const express = require("express")
const app = express()
const cors = require("cors")
const { GoogleGenAI } = require("@google/genai/node")
require("dotenv").config()
app.use(cors())
app.use(express.json());



const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

const apiKeys = [
        process.env.REACT_APP_API_KEY_1,
        process.env.REACT_APP_API_KEY_2,
        process.env.REACT_APP_API_KEY_3,
        process.env.REACT_APP_API_KEY_4,
        process.env.REACT_APP_API_KEY_5,
        process.env.REACT_APP_API_KEY_6,
        process.env.REACT_APP_API_KEY_7,
        process.env.REACT_APP_API_KEY_8,
        process.env.REACT_APP_API_KEY_9,
        process.env.REACT_APP_API_KEY_10,
        process.env.REACT_APP_API_KEY_11,
        process.env.REACT_APP_API_KEY_12,
        process.env.REACT_APP_API_KEY_13,
        process.env.REACT_APP_API_KEY_14
    ]

app.post("/Ai", (req,res) =>{
    const prompt = req.body?.prompt
    let currentKeyIndex = 0
    const query = async(userPrompt) =>{
        const ai = new GoogleGenAI({
            apiKey: apiKeys[currentKeyIndex]
        });
        try {
            const result = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: userPrompt
            });
            const formatedText = result.text.replace(/\*\*/g, '')
            if (formatedText.toLocaleLowerCase().includes("google")) {
                res.status(201).json({Text:"I am an AI developed by Tilux and to help you in areas like making research and automation, feel free to ask me whatever you want",className:"response"})
            }
            else{
                console.log(formatedText);
                res.status(201).json({Text:formatedText,className:"response"})
            }
        }
        catch (error){                
            if(currentKeyIndex >= 13){
                res.status(201).json({Text:"Server Error, pls try again later",className:"response"})
            }
            else{
                console.error("Gemini Error:", error);
                currentKeyIndex = currentKeyIndex + 1                    
                query(userPrompt)
            }
        } 
    }
    query(prompt)
})

app.post("/voiceAi", (req,res) =>{
    const prompt = req.body?.prompt
    let currentKeyIndex = 0
    const query = async(userPrompt) =>{
        const ai = new GoogleGenAI({
            apiKey: apiKeys[currentKeyIndex]
        });
        try {
            const result = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: userPrompt
            });
            const formatedText = result.text.replace(/\*\*/g, '')
            if (formatedText.toLocaleLowerCase().includes("google")) {
                res.status(201).json({message: "I am an AI developed by Tilux and to help you in areas like making research and automation, feel free to ask me whatever you want"})
            }
            else{
                console.log(formatedText);
                res.status(201).json({message: formatedText})
            }
        }
        catch (error){                
            if(currentKeyIndex >= 13){
                res.status(201).json({message: "Server Error, pls try again later"})
            }
            else{
                console.error("Gemini Error:", error);
                currentKeyIndex = currentKeyIndex + 1                    
                query(userPrompt)
            }
        } 
    }
    query(prompt)
})
