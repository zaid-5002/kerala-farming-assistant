export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        messages: [
          {
            role: "system",
            content: `You are an expert AI farming assistant specialized in Kerala agriculture. 
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
            You can respond in both English and Malayalam if needed.`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq API error");
    }

    const botResponse = data.choices?.[0]?.message?.content || 
      "I couldn't process that request. Please try again.";

    return res.status(200).json({ response: botResponse });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "Failed to get response. Please try again later.",
      details: error.message,
    });
  }
}
