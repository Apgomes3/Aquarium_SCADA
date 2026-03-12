import { useState, useEffect } from 'react';
import { Bot, Sparkles, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function AIInsights() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const prompt = `
        You are an AI assistant for a public aquarium SCADA system.
        Analyze the following current tank metrics and provide a brief, professional, industrial-style insight or recommendation (max 3 sentences).
        
        Tank: Tropical Reef (TNK-02)
        Status: Warning
        Metrics: Temp 26.8°C (High), pH 8.0 (Normal), Salinity 34.8 ppt (Normal), ORP 280 mV (Low).
        Recent Alert: ORP dropping in Tropical Reef.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setInsight(response.text || 'Analysis complete. No critical deviations found.');
    } catch (error) {
      console.error('Failed to generate insight:', error);
      setInsight('Failed to connect to AI analysis core. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsight();
  }, []);

  return (
    <div className="bg-[#0d131c] border border-cyan-500/30 rounded-xl p-5 flex flex-col h-full relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.05)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-cyan-500/20 p-1.5 rounded-md border border-cyan-500/30">
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-sm font-medium text-cyan-400 uppercase tracking-wider">AI Analysis Core</h3>
        </div>
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Refresh
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
            <p className="text-xs uppercase tracking-widest font-mono animate-pulse">Analyzing telemetry...</p>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 relative">
            <div className="absolute -left-px top-4 bottom-4 w-[2px] bg-cyan-500 rounded-full"></div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {insight}
            </p>
            
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Recommended Action: Inspect ozone generator on TNK-02</span>
            </div>
          </div>
        )}
      </div>

      <button className="mt-4 w-full py-2.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md hover:bg-cyan-500/20 transition-colors text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2">
        Execute Diagnostics <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
