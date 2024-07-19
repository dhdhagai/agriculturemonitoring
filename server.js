const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require("dotenv").config();
const app = express();
const port = 3000;
const apiKey = "Enter API Key";  // Replace with your actual OpenAI API key
const cors= require("cors")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors())
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
console.log(userMessage)
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
          
          axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCBqHB-LydVsiJUNpZLnS6YybkykHqUWEQ', data, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log();
            res.status(200).send(JSON.stringify({"reply": response.data.candidates[0].content.parts[0].text}));
          })
          .catch(error => {
            console.error(error);
            
          });

        
        
    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
