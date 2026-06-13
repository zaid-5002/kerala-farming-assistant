export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const SYSTEM_PROMPT = `You are an expert AI-powered Personal Farming Assistant specifically designed for Kerala farmers in India. You have deep knowledge of:

- Kerala's unique agro-climatic zones (high ranges, midland, coastal regions)
- Traditional Kerala crops: Paddy (Rice), Coconut, Rubber, Banana, Tapioca, Black Pepper, Cardamom, Coffee, Arecanut, Jackfruit, Mango
- Kerala's monsoon seasons: Southwest monsoon (June–September), Northeast monsoon (October–November), pre-monsoon, and summer
- Kerala soil types: Laterite, alluvial, sandy loam, forest soils
- Integrated Pest Management (IPM) for Kerala crops
- Organic and traditional Kerala farming methods (Jeevamritam, Panchagavya)
- Government schemes: Kerala Agricultural University, VFPCK, Krishi Vigyan Kendras, PM-KISAN
- Water management: rain-fed, drip irrigation, canal irrigation in Kerala
- Disease management: leaf blight, root wilt, Phytophthora, yellowing disease in coconut
- Market prices and agricultural economics relevant to Kerala

Guidelines:
- Warm, respectful tone like talking to a fellow farmer
- Practical, actionable advice suited to Kerala's climate
- Use metric units
- If a district is mentioned, tailor advice to that region
- Occasionally use Malayalam words naturally (Namaskaram, Nanni, crop names)
- Clear, structured, easy-to-understand responses
- Help diagnose crop diseases or pest problems from symptoms
- Prioritize sustainable and eco-friendly farming practices
- Be encouraging — farming is hard work!`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || 'Sorry, no response received.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Groq API Error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
