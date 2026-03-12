import { useState } from 'react';
import { Activity, Droplet, Thermometer, Waves, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WaterQualityChart } from './WaterQualityChart';

interface TankStatusProps {
  id: string;
  name: string;
  type: string;
  volume: string;
  status: 'optimal' | 'warning' | 'critical';
  metrics: {
    temp: number;
    ph: number;
    salinity: number;
    orp: number;
  };
}

export function TankStatus({ id, name, type, volume, status, metrics }: TankStatusProps) {
  const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

  const statusColors = {
    optimal: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    warning: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    critical: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
  };

  const statusGlow = {
    optimal: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    warning: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    critical: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]',
  };

  const getParameterLabel = (param: string) => {
    switch (param) {
      case 'temp': return 'Temperature';
      case 'ph': return 'pH';
      case 'salinity': return 'Salinity';
      case 'orp': return 'ORP';
      default: return param;
    }
  };

  return (
    <>
      <div className={`bg-[#0d131c] border border-slate-800 rounded-xl p-5 flex flex-col gap-4 transition-all hover:border-slate-700 ${statusGlow[status]}`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-500 tracking-wider">{id}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-widest font-semibold ${statusColors[status]}`}>
                {status}
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-200">{name}</h3>
            <p className="text-xs text-slate-500">{type} • {volume}</p>
          </div>
          <button className="p-1.5 text-slate-500 hover:text-cyan-400 transition-colors rounded-md hover:bg-slate-800">
            <Activity className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <MetricCard 
            icon={Thermometer} 
            label="Temp" 
            value={`${metrics.temp}°C`} 
            onClick={() => setSelectedTrend('temp')}
          />
          <MetricCard 
            icon={Droplet} 
            label="pH" 
            value={metrics.ph.toFixed(1)} 
            onClick={() => setSelectedTrend('ph')}
          />
          <MetricCard 
            icon={Waves} 
            label="Salinity" 
            value={`${metrics.salinity} ppt`} 
            onClick={() => setSelectedTrend('salinity')}
          />
          <MetricCard 
            icon={Activity} 
            label="ORP" 
            value={`${metrics.orp} mV`} 
            onClick={() => setSelectedTrend('orp')}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedTrend && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">
                      {getParameterLabel(selectedTrend)} Trends
                    </h3>
                    <p className="text-sm text-slate-500">
                      {name} ({id}) • Past 24 Hours
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 h-[350px]">
                <WaterQualityChart parameter={selectedTrend === 'salinity' ? 'sal' : selectedTrend} tankId={id} />
              </div>

              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MetricCard({ icon: Icon, label, value, onClick }: { icon: any, label: string, value: string | number, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50 flex flex-col gap-1 cursor-pointer hover:border-slate-600 transition-colors group"
    >
      <div className="flex items-center justify-between text-slate-500">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-medium">{label}</span>
        </div>
        <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
      </div>
      <span className="text-lg font-mono text-slate-300">{value}</span>
    </div>
  );
}
