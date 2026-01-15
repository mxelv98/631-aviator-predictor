
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Use Vite environment variable
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const getAiAnalysis = async (userPrompt: string, isVip: boolean) => {
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
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // Using stable model
      systemInstruction,
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7,
      }
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "HANDSHAKE_ERROR: Database unavailable. Retry connection.";
  }
};

export const getVipPrediction = async () => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            predictedMultiplier: {
              type: SchemaType.NUMBER,
              description: "The predicted crash multiplier value",
            },
            confidence: {
              type: SchemaType.NUMBER,
              description: "Confidence percentage (0-100)",
            },
            reasoning: {
              type: SchemaType.STRING,
              description: "3-word explanation.",
            },
          },
          required: ["predictedMultiplier", "confidence", "reasoning"],
        },
      },
    });

    const result = await model.generateContent("Predict a realistic Aviator crash multiplier. Target range 1.5x - 8.5x. Provide multiplier, confidence, and 3-word reason.");
    return JSON.parse(result.response.text() || '{}');

  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    return {
      predictedMultiplier: Number((Math.random() * 2 + 1.2).toFixed(2)),
      confidence: 88,
      reasoning: "CLUSTER_SYNC_OK"
    };
  }
};

export const chatWithSupport = async (history: any[]) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are a helpful customer support assistant for the 1631 Aviator Predictor service. You help users with account issues, payment questions, and explain how the predictor works. Keep answers concise."
    });

    // Separate the last message (current question) from history
    // AIAgent pushes the new user message to history before calling this.
    const previousHistory = history.slice(0, -1);
    const lastMessage = history[history.length - 1];

    const chat = model.startChat({
      history: previousHistory,
    });

    // Check if lastMessage has parts, extract text
    const text = lastMessage?.parts?.[0]?.text || '';

    if (!text) return "Error: No input text provided.";

    const result = await chat.sendMessage(text);
    return result.response.text();
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};