import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBirthdayMessage = async (recipientName: string, giftItem: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Que seu dia seja tão brilhante quanto um girassol!";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, romantic, and poetic birthday message (max 3 sentences) in Portuguese for someone named ${recipientName} who just received a gift of: ${giftItem}. Use metaphors involving sunflowers, light, and happiness.`,
    });
    return response.text || "Parabéns pelo seu dia especial!";
  } catch (error) {
    console.error("Error generating message:", error);
    return "Que seu dia seja repleto de luz e alegria como um campo de girassóis!";
  }
};
