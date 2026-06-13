import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are an expert AI farming assistant specialized in Kerala agriculture. 
      You provide advice on:
      - Crops suitable for Kerala's climate and monsoon seasons
      - Pest control and disease management
      - Irrigation techniques for rice, coconut, and other crops
      - Soil health and nutrient management
      - Government agricultural schemes in Kerala
      - Organic farming practices
      
      Always provide practical, actionable advice tailored to Kerala's farming conditions.
      If the question is not related to farming, politely redirect the conversation back to farming topics.
      Be helpful, informative, and speak in simple terms that farmers can understand.
      You can respond in both English and Malayalam if needed.`,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const botResponse =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I couldn't process that request. Please try again.";

    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Failed to get response from AI. Please try again later.",
      details: error.message,
    });
  }
}
