
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

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided.' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are HopeLine, a compassionate AI assistant trained to provide emotional support. Offer calming responses and encourage users in crisis to contact 988 or seek professional help. Never provide medical advice or act as a therapist."
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
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`HopeLine server is running on port ${port}`);
});
