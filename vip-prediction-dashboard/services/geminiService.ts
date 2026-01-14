
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIPrediction = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional VIP sport/trading analyst. Based on this data: ${context}, provide a brief 1-sentence prediction in Arabic. Keep it professional and confident.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "عذراً، فشل الاتصال بخدمة التحليل الذكي.";
  }
};

export const chatWithSupport = async (history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'أنت مساعد دعم فني ذكي لخدمة VIP التوقعات. تحدث دائماً باللغة العربية بأسلوب احترافي وودي. اشرح مميزات الاشتراك الـ VIP المذكورة في الموقع.',
      }
    });
    
    // We send the last message but the full history would be better for a real chat
    const lastMessage = history[history.length - 1].parts[0].text;
    const result = await chat.sendMessage({ message: lastMessage });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "لا يمكنني الرد حالياً، يرجى المحاولة لاحقاً.";
  }
};
