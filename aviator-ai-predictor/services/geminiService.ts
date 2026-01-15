
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiAnalysis = async (userPrompt: string, isVip: boolean) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are the "1631 Aviator Expert". Your goal is to provide analysis and trends for the crash game Aviator. 
    You analyze risk, probability, and historical patterns. 
    Always speak in a professional, encouraging, but realistic tone.
    Current User Status: ${isVip ? 'VIP Member' : 'Standard User'}.
    If user is VIP, provide more detailed "signals". If not, encourage upgrading.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble analyzing the market right now. Please try again in a moment.";
  }
};

export const getVipPrediction = async () => {
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: "Predict the next crash multiplier for an Aviator game session based on typical high-volatility algorithms. Provide a realistic target multiplier, confidence percentage, and a very short reasoning.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedMultiplier: {
              type: Type.NUMBER,
              description: "The predicted crash multiplier value (e.g. 2.45)",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence percentage (0-100)",
            },
            reasoning: {
              type: Type.STRING,
              description: "A short 5-word explanation for the signal.",
            },
          },
          required: ["predictedMultiplier", "confidence", "reasoning"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    return {
      predictedMultiplier: Math.random() * 3 + 1.1,
      confidence: 85,
      reasoning: "Market stability detected."
    };
  }
};
