const axios = require('axios');
require('dotenv').config();

// Weather Handler
const getWeather = async (event) => {
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key=3b4f58d00c534805bc7141356242407&q=Vadodara&days=3&aqi=no&alerts=yes');
    return {
      statusCode: 200,
      body: JSON.stringify({
        "current": response.data.current,
        "forecast": response.data.forecast,
        "location": response.data.location
      }),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};

// Chat Handler
const chatHandler = async (event) => {
  const userMessage = JSON.parse(event.body).message;
  const apiKey = process.env.APIKEY;

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

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    let reply;
    try {
      reply = response.data.candidates[0].content.parts[0].text;
    } catch {
      reply = "Sorry I am having trouble working out your query. Can you input it again?";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ "reply": reply }),
    };
  } catch (error) {
    console.error('Error making API request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch AI response' }),
    };
  }
};

// Main handler for API requests
exports.handler = async (event, context) => {
  switch (event.path) {
    case '/api/weather':
      return getWeather(event);
    case '/api/chat':
      return chatHandler(event);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' }),
      };
  }
};
