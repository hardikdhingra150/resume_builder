import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Use gemini-pro instead of gemini-1.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const enhanceContent = async (text, type) => {
  const prompts = {
    achievement: `Rewrite this achievement professionally for a resume using action verbs and quantifiable metrics. Keep it concise and impactful: ${text}`,
    project: `Enhance this project description for a resume, highlighting technical skills and impact. Make it professional and ATS-friendly: ${text}`,
    summary: `Create a compelling professional summary from this information for a resume. Keep it to 2-3 sentences: ${text}`
  };

  try {
    const result = await model.generateContent(prompts[type]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return text; // Return original text if AI fails
  }
};
