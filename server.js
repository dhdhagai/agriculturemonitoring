const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;
const apiKey = "Enter API Key";  // Replace with your actual OpenAI API key

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch('https://generativelanguage.googleapis.com/$discovery/rest?version=v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const aiReply = data.choices[0].text.trim();

    res.json({ reply: aiReply });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});
