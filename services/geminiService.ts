import { GoogleGenAI, Type } from "@google/genai";

// Use VITE_API_KEY for Vite compatibility. 
// Fallback to empty string if undefined (this will cause API calls to fail gracefully into the catch block)
const apiKey = import.meta.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getPrediction = async (): Promise<{ multiplier: number; seconds: number }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: "Generate a plausible crash game multiplier prediction between 1.10 and 50.00 and a 'seconds until close' between 5 and 20. Provide a diverse range of outcomes including occasional high multipliers (10x+).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            multiplier: {
              type: Type.NUMBER,
              description: "The predicted crash multiplier (e.g., 2.35)",
            },
            seconds: {
              type: Type.NUMBER,
              description: "The time in seconds until this prediction expires",
            },
          },
          required: ["multiplier", "seconds"],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    // Ensure values are numbers to match return type interface
    return {
      multiplier: Number(result.multiplier) || Number((Math.random() * 5 + 1).toFixed(2)),
      seconds: Number(result.seconds) || 15
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails
    return {
      multiplier: Number((Math.random() * 4 + 1.2).toFixed(2)),
      seconds: 10
    };
  }
};

export const chatWithSupport = async (history: { role: string; parts: { text: string }[] }[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: history,
    });
    return response.text || "I'm having trouble connecting right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I am currently offline. Please try again later.";
  }
};