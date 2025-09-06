// Node.js Express route
import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { messages } = req.body;
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 350,
        temperature: 0.7,
      }),
    });
    const data = await response.json();
    console.log("data =>", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: "Error connecting to OpenAI" });
  }
});

export default router;
