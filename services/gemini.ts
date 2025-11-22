import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment");
  }
  return new GoogleGenAI({ apiKey });
};

export const enhanceText = async (text: string, context: string = "resume"): Promise<string> => {
  try {
    const client = getClient();
    const prompt = `You are a professional resume writer. 
    Enhance the following ${context} text to be more professional, impactful, and concise. 
    Use active verbs. 
    Keep it under 30 words. 
    Do not include quotes or preamble.
    Text: "${text}"`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text; // Fallback to original
  }
};

export const generateBulletPoint = async (role: string, company: string): Promise<string> => {
  try {
    const client = getClient();
    const prompt = `Generate a single, high-impact resume bullet point for a ${role} position at ${company}.
    Focus on achievements and metrics.
    Keep it under 25 words.
    No quotes.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Managed projects and led team initiatives successfully.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Responsible for daily tasks and team collaboration.";
  }
};
