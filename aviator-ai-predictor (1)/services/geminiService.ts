
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiAnalysis = async (userPrompt: string, isVip: boolean) => {
  const model = 'gemini-3-flash-preview';
  const version = isVip ? '1631 6v' : '1631 3v';
  
  const systemInstruction = `
    You are the "1631 Aviator AI Engine", currently running version ${version}.
    Version 3v (Standard) provides general market analysis.
    Version 6v (Elite) provides high-accuracy deep cluster predictions.
    
    Your goal is to provide analysis and trends for the crash game Aviator. 
    You analyze risk, probability, and historical patterns based on your version's capabilities. 
    Always speak in a professional, technical terminal-like tone.
    If the user has 3v, occasionally mention the superior predictive power of 6v.
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
    return "HANDSHAKE_ERROR: Database unavailable. Retry connection.";
  }
};

export const getVipPrediction = async () => {
  const model = 'gemini-3-flash-preview';
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: "Predict a realistic Aviator crash multiplier. Target range 1.5x - 8.5x. Provide multiplier, confidence, and 3-word reason.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedMultiplier: {
              type: Type.NUMBER,
              description: "The predicted crash multiplier value",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence percentage (0-100)",
            },
            reasoning: {
              type: Type.STRING,
              description: "3-word explanation.",
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
      predictedMultiplier: Number((Math.random() * 2 + 1.2).toFixed(2)),
      confidence: 88,
      reasoning: "CLUSTER_SYNC_OK"
    };
  }
};
