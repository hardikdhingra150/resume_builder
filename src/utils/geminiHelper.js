// src/utils/geminiHelper.js or wherever your AI code is
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function enhanceText(text, type = 'general') {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompts = {
    experience: `You are a professional resume writer. Transform this work experience into 2-3 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line
- Start each bullet with a strong action verb (Built, Led, Designed, Developed, Implemented, Optimized, etc.)
- Maximum 2 lines per bullet point
- Include metrics, numbers, or results where possible (e.g., "Increased X by Y%", "Built app with Z users")
- Use past tense for past roles
- Be specific about technologies/tools used
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    project: `You are a professional resume writer. Transform this project description into 2-3 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line
- Start each bullet with a strong action verb (Built, Created, Developed, Designed, Implemented, etc.)
- Maximum 2 lines per bullet point
- Include specific technologies, frameworks, and tools used
- Mention key features or outcomes
- Be technical but clear
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    achievement: `You are a professional resume writer. Transform this achievement into 1-2 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line
- Start with a strong action verb (Achieved, Won, Led, Secured, etc.)
- Maximum 2 lines per bullet point
- Include specific results, numbers, rankings, or recognition
- Be specific and quantifiable
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    skills: `You are a professional resume writer. Organize these skills into a clean, ATS-friendly format.

Rules:
- Group similar skills together
- Remove duplicates
- Use proper technical terminology
- Format as: "Category: skill1, skill2, skill3"
- Keep it concise
- NO paragraphs

Input text:
${text}

Organized skills:`,

    general: `You are a professional resume writer. Transform this text into 2-3 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line
- Start each bullet with a strong action verb
- Maximum 2 lines per bullet point
- Be specific and include relevant details
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`
  };

  const prompt = prompts[type] || prompts.general;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text().trim();
    
    return enhancedText;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw new Error('Failed to enhance text. Please try again.');
  }
}
