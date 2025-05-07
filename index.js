
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are HopeLine, an AI emotional support assistant. You are kind, calming, and always direct users in danger to 988 or emergency help. You do not diagnose or give therapy advice."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 300
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.listen(port, () => {
  console.log(`HopeLine backend running on port ${port}`);
});
