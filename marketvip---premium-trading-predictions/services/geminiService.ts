
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMarketPrediction = async (symbol: string): Promise<PredictionResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the current potential trend for ${symbol}. Provide a trend (UP, DOWN, or NEUTRAL), reasoning, and a confidence score between 0 and 100.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING },
          trend: { type: Type.STRING, enum: ['UP', 'DOWN', 'NEUTRAL'] },
          reasoning: { type: Type.STRING },
          confidence: { type: Type.NUMBER }
        },
        required: ["symbol", "trend", "reasoning", "confidence"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as PredictionResult;
  } catch (error) {
    console.error("Failed to parse prediction", error);
    throw new Error("حدث خطأ أثناء جلب التحليل");
  }
};
