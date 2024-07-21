const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const path = require("path")
const app = express();
const apiKey = process.env.APIKEY
console.log(apiKey)  // Replace with your actual OpenAI API key
const cors = require('cors');
app.use(express.static(path.join(__dirname, '/../')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req,res) => {
    
})
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage);
    try {
        const data = {
            contents: [
                {
                    parts: [
                        {
                            text: userMessage
                        }
                    ]
                }
            ]
        };

        axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(response => {
        try{
            let reply = response.data.candidates[0].content.parts[0].text
            res.status(200).send(JSON.stringify({ "reply": reply }));
        }
        catch {
            reply = "Sorry I am having Trouble working out your query, Can you input it again?"
            res.status(200).send(JSON.stringify({ "reply": reply }));
        }
           
        
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch AI response' });
        });

    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

module.exports.handler = serverless(app);
process.argv.forEach(function (val, index, array) {
    if(val == "homerun"){
        app.listen(3000, () => {
            console.log("Started Server at 3000")
        })
    }
  });
