import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Filter, RefreshCw, Database } from 'lucide-react';
import { WaterQualityChart } from './WaterQualityChart';

const systems = [
  { id: 'TNK-01', name: 'Ocean Voyager' },
  { id: 'TNK-02', name: 'Tropical Reef' },
  { id: 'TNK-03', name: 'Cold Water' },
];

const parameters = [
  { id: 'temp', name: 'Temperature', unit: '°C' },
  { id: 'ph', name: 'pH Level', unit: '' },
  { id: 'salinity', name: 'Salinity', unit: 'ppt' },
  { id: 'orp', name: 'ORP', unit: 'mV' },
  { id: 'nh3', name: 'Ammonia', unit: 'mg/L' },
  { id: 'no2', name: 'Nitrite', unit: 'mg/L' },
  { id: 'no3', name: 'Nitrate', unit: 'mg/L' },
];

const timeWindows = [
  { id: '24h', label: 'Last 24 Hours' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: '1y', label: 'Last 1 Year' },
];

export function Trends() {
  const [selectedSystem, setSelectedSystem] = useState(systems[0].id);
  const [selectedParam, setSelectedParam] = useState(parameters[0].id);
  const [selectedWindow, setSelectedWindow] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Historical Trends</h2>
          <p className="text-sm text-slate-500">Analyze long-term system performance and water quality data.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={`p-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md hover:bg-slate-700 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md text-sm font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0d131c] border border-slate-800 rounded-xl p-5 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">System / Tank</label>
              <div className="space-y-2">
                {systems.map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedSystem === sys.id 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    {sys.name}
                    <span className="block text-[10px] opacity-50">{sys.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">Parameter</label>
              <select 
                value={selectedParam}
                onChange={(e) => setSelectedParam(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-sm text-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50"
              >
                {parameters.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.unit})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">Time Window</label>
              <div className="grid grid-cols-1 gap-2">
                {timeWindows.map((tw) => (
                  <button
                    key={tw.id}
                    onClick={() => setSelectedWindow(tw.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedWindow === tw.id 
                        ? 'bg-slate-700 text-white border border-slate-600' 
                        : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    {tw.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Data Source</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Historical data is retrieved from the primary SCADA historian. High-resolution data is downsampled for windows exceeding 30 days.
            </p>
          </div>
        </div>

        {/* Chart Area */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            key={`${selectedSystem}-${selectedParam}-${selectedWindow}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0d131c] border border-slate-800 rounded-xl p-6 h-[600px] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-medium text-slate-200">
                  {parameters.find(p => p.id === selectedParam)?.name} Trend
                </h3>
                <p className="text-xs text-slate-500">
                  {systems.find(s => s.id === selectedSystem)?.name} • {timeWindows.find(tw => tw.id === selectedWindow)?.label}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                  <span className="text-slate-400">Measured Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700 border border-dashed border-slate-500"></span>
                  <span className="text-slate-400">Target Setpoint</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-0">
              <WaterQualityChart parameter={selectedParam} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0d131c] border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Average</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-slate-200">24.8</span>
                <span className="text-xs text-slate-500">°C</span>
              </div>
            </div>
            <div className="bg-[#0d131c] border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Peak</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-rose-400">26.2</span>
                <span className="text-xs text-slate-500">°C</span>
              </div>
            </div>
            <div className="bg-[#0d131c] border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Minimum</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-cyan-400">23.1</span>
                <span className="text-xs text-slate-500">°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
