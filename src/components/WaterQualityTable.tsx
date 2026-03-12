import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, AlertTriangle, CheckCircle2, X, TrendingUp } from 'lucide-react';
import { WaterQualityChart } from './WaterQualityChart';

const tanks = [
  { id: 'TNK-01', name: 'Ocean Voyager', type: 'Saltwater', temp: 24.5, ph: 8.2, sal: 35.1, orp: 320, nh3: 0.01, no2: 0.00, no3: 5.2, status: 'Optimal' },
  { id: 'TNK-02', name: 'Tropical Reef', type: 'Saltwater', temp: 26.8, ph: 8.0, sal: 34.8, orp: 280, nh3: 0.05, no2: 0.02, no3: 12.5, status: 'Warning' },
  { id: 'TNK-03', name: 'Cold Water', type: 'Saltwater', temp: 12.2, ph: 8.1, sal: 33.5, orp: 350, nh3: 0.00, no2: 0.00, no3: 2.1, status: 'Optimal' },
  { id: 'TNK-04', name: 'Amazon River', type: 'Freshwater', temp: 28.5, ph: 6.8, sal: 0.0, orp: 250, nh3: 0.02, no2: 0.01, no3: 15.0, status: 'Optimal' },
  { id: 'TNK-05', name: 'Jellyfish Cyl', type: 'Saltwater', temp: 18.0, ph: 8.1, sal: 34.0, orp: 300, nh3: 0.01, no2: 0.00, no3: 1.5, status: 'Optimal' },
  { id: 'QT-01', name: 'Quarantine A', type: 'Saltwater', temp: 25.0, ph: 8.0, sal: 32.0, orp: 290, nh3: 0.10, no2: 0.05, no3: 25.0, status: 'Critical' },
];

export function WaterQualityTable() {
  const [selectedTrend, setSelectedTrend] = useState<{ tankId: string, tankName: string, parameter: string } | null>(null);

  const handleParamClick = (tankId: string, tankName: string, parameter: string) => {
    setSelectedTrend({ tankId, tankName, parameter });
  };

  const getParameterLabel = (param: string) => {
    switch (param) {
      case 'temp': return 'Temperature';
      case 'ph': return 'pH';
      case 'sal': return 'Salinity';
      case 'orp': return 'ORP';
      case 'nh3': return 'Ammonia (NH3)';
      case 'no2': return 'Nitrite (NO2)';
      case 'no3': return 'Nitrate (NO3)';
      default: return param;
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Water Quality Parameters</h2>
          <p className="text-sm text-slate-500">Live telemetry across all connected tanks. Click any value to view 24h trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d131c] border border-slate-800 rounded-xl overflow-hidden flex-1 flex flex-col"
      >
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Tank ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Temp (°C)</th>
                <th className="p-4 font-medium">pH</th>
                <th className="p-4 font-medium">Salinity (ppt)</th>
                <th className="p-4 font-medium">ORP (mV)</th>
                <th className="p-4 font-medium">NH3 (ppm)</th>
                <th className="p-4 font-medium">NO2 (ppm)</th>
                <th className="p-4 font-medium">NO3 (ppm)</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
              {tanks.map((tank) => (
                <tr key={tank.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-4 font-mono text-cyan-400">{tank.id}</td>
                  <td className="p-4 font-medium text-slate-200">{tank.name}</td>
                  <td className="p-4 text-slate-500">{tank.type}</td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'temp')}
                      className="hover:text-cyan-400 hover:bg-cyan-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.temp.toFixed(1)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'ph')}
                      className="hover:text-emerald-400 hover:bg-emerald-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.ph.toFixed(2)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'sal')}
                      className="hover:text-amber-400 hover:bg-amber-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.sal.toFixed(1)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'orp')}
                      className="hover:text-purple-400 hover:bg-purple-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.orp}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'nh3')}
                      className="hover:text-rose-400 hover:bg-rose-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.nh3.toFixed(2)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'no2')}
                      className="hover:text-pink-400 hover:bg-pink-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.no2.toFixed(2)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4 font-mono">
                    <button 
                      onClick={() => handleParamClick(tank.id, tank.name, 'no3')}
                      className="hover:text-cyan-400 hover:bg-cyan-400/10 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      {tank.no3.toFixed(1)}
                      <TrendingUp className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {tank.status === 'Optimal' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {tank.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                      {tank.status === 'Critical' && <Activity className="w-4 h-4 text-rose-400" />}
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        tank.status === 'Optimal' ? 'text-emerald-400' : 
                        tank.status === 'Warning' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {tank.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTrend && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">
                      {getParameterLabel(selectedTrend.parameter)} Trends
                    </h3>
                    <p className="text-sm text-slate-500">
                      {selectedTrend.tankName} ({selectedTrend.tankId}) • Past 24 Hours
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
              
              <div className="p-8 h-[450px]">
                <WaterQualityChart parameter={selectedTrend.parameter} tankId={selectedTrend.tankId} />
              </div>

              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
                  Download Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
