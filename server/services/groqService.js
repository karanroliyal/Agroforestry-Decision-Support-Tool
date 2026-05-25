const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generateRecommendations = async ({ region, soil, rainfall, purpose }) => {
  const prompt = `
You are an expert in agroforestry for Indian farming conditions.
The user is asking for tree species recommendations based on the following land conditions:
- State/Region: ${region}
- Soil Type: ${soil}
- Annual Rainfall: ${rainfall}
- Main Purpose: ${purpose}

Please provide exactly 3 tree species recommendations that are best suited for these conditions.
For each recommendation, provide:
1. The tree name
2. A short explanation (2-3 lines) of the tree
3. Why it matches the user's conditions (including suitable climate/soil information)
4. A match percentage (a number between 0 and 100 representing how well it fits).

Output MUST be strictly in JSON format as follows, with no extra text or markdown formatting outside the JSON:
{
  "recommendations": [
    {
      "name": "Tree Name",
      "explanation": "Short 2-3 line explanation...",
      "reasoning": "Why it matches and climate/soil info...",
      "matchPercentage": 92
    }
  ]
}
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an agroforestry expert for Indian farming conditions. You provide practical and realistic recommendations. Always reply with valid JSON array of objects."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" } // Using json_object might require the prompt to expect an object, so let's adjust it
    });

    // Wait, groq API with response_format json_object requires the prompt to specify "JSON" and we need to wrap the array in an object, e.g. { "recommendations": [...] }
    
    // Let's modify the prompt to ask for an object containing the array.
    return parseGroqResponse(chatCompletion.choices[0]?.message?.content);
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
};

const parseGroqResponse = (content) => {
  try {
    const parsed = JSON.parse(content);
    if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
      return parsed.recommendations;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse Groq response:', content);
    throw new Error('Invalid response format from AI');
  }
};

module.exports = {
  generateRecommendations
};
