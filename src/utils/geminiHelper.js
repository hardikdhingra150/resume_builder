import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function enhanceContent(text, type = 'general') {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompts = {
    experience: `You are a professional resume writer. Transform this work experience into 2-4 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line starting with "• "
- Start each bullet with a strong action verb (Built, Led, Designed, Developed, Implemented, Optimized, Managed, etc.)
- Maximum 2 lines per bullet point
- Include metrics, numbers, or results where possible (e.g., "Increased X by Y%", "Built app with Z users")
- Use past tense for past roles, present tense for current roles
- Be specific about technologies/tools used
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    project: `You are a professional resume writer. Transform this project description into 2-4 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line starting with "• "
- Start each bullet with a strong action verb (Built, Created, Developed, Designed, Implemented, Architected, etc.)
- Maximum 2 lines per bullet point
- Include specific technologies, frameworks, and tools used
- Mention key features or outcomes with numbers if possible
- Be technical but clear
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    achievement: `You are a professional resume writer. Transform this achievement into 1-3 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line starting with "• "
- Start with a strong action verb (Achieved, Won, Led, Secured, Ranked, Awarded, etc.)
- Maximum 2 lines per bullet point
- Include specific results, numbers, rankings, or recognition
- Be specific and quantifiable
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    summary: `You are a professional resume writer. Transform this summary into 2-3 concise, impactful bullet points highlighting key strengths and expertise.

Rules:
- Each bullet point must be on a new line starting with "• "
- Focus on expertise, years of experience, key skills, and value proposition
- Maximum 2 lines per bullet point
- Be specific about domain expertise and technologies
- Professional and confident tone
- NO paragraphs, ONLY bullet points
- Do NOT add any extra text, introduction, or conclusion

Input text:
${text}

Enhanced bullet points:`,

    general: `You are a professional resume writer. Transform this text into 2-3 concise, impactful bullet points.

Rules:
- Each bullet point must be on a new line starting with "• "
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
    let enhancedText = response.text().trim();
    
    // Clean up the response - remove any markdown formatting
    enhancedText = enhancedText.replace(/```/g, '').replace(/\*\*/g, '');
    
    return enhancedText;
  } catch (error) {
    console.error('Error enhancing text:', error);
    throw new Error('Failed to enhance text. Please check your API key and try again.');
  }
}

// Alternative export name for backward compatibility
export const enhanceText = enhanceContent;
