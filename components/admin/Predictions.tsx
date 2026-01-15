
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Predictions: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePredictions = async () => {
    setLoading(true);
    try {
      // Initialize GoogleGenAI using Vite env var
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) throw new Error('API Key missing');

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze these mock admin stats: 25k users, 1.2k VIPs, $145k total payments. Provide a short, 3-point strategic prediction for next month in French, as this is for a French-speaking admin.",
        config: {
          systemInstruction: "Tu es un analyste de données expert pour une plateforme SaaS. Tes prédictions doivent être concises et orientées business.",
        }
      });
      setInsight(response.text || "Aucune prédiction disponible.");
    } catch (error) {
      console.error("AI Error:", error);
      setInsight("Erreur lors de la génération des prédictions. Veuillez vérifier votre clé API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Prédictions IA</h1>
        <p className="text-gray-500 mt-2">Utilisez Gemini pour analyser vos tendances et anticiper la croissance.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-50 rounded-lg">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold">Analyse Prédictive</h3>
            <p className="text-sm text-gray-500">Basé sur les données de paiement et d'utilisateurs actuelles.</p>
          </div>
        </div>

        {!insight && !loading && (
          <button
            onClick={generatePredictions}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Générer les prédictions
          </button>
        )}

        {loading && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            <span>Analyse des données en cours...</span>
          </div>
        )}

        {insight && (
          <div className="space-y-4">
            <div className="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {insight}
            </div>
            <button
              onClick={() => setInsight(null)}
              className="text-sm text-gray-500 hover:text-gray-900 font-medium mt-4 underline decoration-dotted"
            >
              Réinitialiser l'analyse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
